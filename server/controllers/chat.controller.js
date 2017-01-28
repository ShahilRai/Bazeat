import  Conversation from '../models/conversation';
import  Message from '../models/message';
import  User from '../models/user';
import * as MailService from '../services/mailer';
import * as MessageService from '../services/twillio';


export function allConversations(req, res, next) {
  User.findOne({ email: req.query.email }).exec((err, user) => {
    Conversation.find({ participants: user._id })
      .select('_id')
      .exec(function(err, conversations) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
        // Set up empty array to hold conversations + most recent message
        let fullConversations = [];
        conversations.forEach(function(conversation) {
          console.log(conversation)
          Message.find({ 'conversation_id': conversation._id })
            .sort('-createdAt')
            .limit(1)
            .populate({
              path: 'sender',
              select: 'full_name photo'
            })
            .populate({
              path: 'receiver',
              select: 'full_name photo'
            })
            .exec(function(err, message) {
              if (err) {
                console.log('message')
                console.log(message)
                res.send({ error: err });
                return next(err);
              }
              fullConversations.push(message);
              if(fullConversations.length === conversations.length) {
                return res.status(200).json({ conversations: fullConversations });
              }
            });
        });
    });
  });
}


export function getConversation(req, res, next) {
  let fullMessages = [];
  Message.find({ conversation_id: req.params.conversation_id })
    .select('createdAt body sender receiver')
    .sort('-updatedAt')
    .limit(2)
    .populate({
      path: 'sender',
      select: 'full_name photo'
    })
    .populate({
      path: 'receiver',
      select: 'full_name photo'
    })
    .exec(function(err, messages) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      if(messages){
        messages.forEach(function(msg, index) {
           Message.findOneAndUpdate({_id: msg._id}, {$set: {'unread': false}}, {new: true}).exec(function(err, model){
            console.log('msg')
            console.log(messages.length == index+1)
            fullMessages.push(model)
            if (messages.length == fullMessages.length){
              return res.status(200).json({ fullMessages });
            }
           })
        })
      }
      else{
        return res.status(200).json({ conversation: "There are no messages for this conversation" });
      }
    });
}


export function newConversation(req, res) {
  let conv
  if(!req.query.recipient_id) {
    res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    return next();
  }
  if(!req.body.composedMessage) {
    res.status(422).send({ error: 'Please enter a message.' });
    return next();
  }
  User.findOne({ email: req.body.email }).exec((err, user) => {
    Conversation.findOne({participants: [user._id, req.query.recipient_id]}).exec(function(err,conversation){
        console.log("1")
      console.log(conversation)
      if(conversation){
        newMessage(conversation, null, res, user, req)
      }
      else{
        const conversation = new Conversation({
          participants: [user._id, req.query.recipient_id]
        });
        conversation.save(function(err, newConversation) {
            console.log('2')
            console.log(newConversation)
          if (err) {
            res.status(422).send({err});
          }
          else{
            newMessage(newConversation, null, res, user, req)
          }
        });
      }

    })
  });
}

export  function newMessage(conversation, next, res, user, req){
  const message = new Message({
    conversation_id: conversation._id,
    body: req.body.composedMessage,
    sender: user._id,
    receiver: req.query.recipient_id
  });
  message.save(function(err, newMessage) {
    if (err) {
      res.status(422).send({err});
    }
    MailService.new_message(newMessage, user)
    res.status(200).json({ message: newMessage });
  });
}


export function sendReply(req, res, next) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    const reply = new Message({
      conversation_id: req.query.conversation_id,
      body: req.body.composedMessage,
      sender: user._id,
      receiver: req.query.recipient_id
    });
    reply.save(function(err, sentReply) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      MailService.send_email(sentReply)
      res.status(200).json({ message: sentReply });
      return(next);
    });
  });
}


export function msgCount(req, res){
  console.log(req.query)
  User.findOne({ email: req.query.email }).exec((err, user) => {
    Conversation.find({ participants: user._id })
      .select('_id')
      .exec(function(err, conversations) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
        // Set up empty array to hold conversations + most recent message
        let fullConversations = [];
        conversations.forEach(function(conversation, index) {
          Message.find({ 'conversation_id': conversation._id, unread: true })
            .sort('-updatedAt')
            .populate({
              path: 'sender',
              select: 'full_name photo'
            })
            .populate({
              path: 'receiver',
              select: 'full_name photo'
            })
            .exec(function(err, message) {
              if (err) {
                res.send({ error: err });
                return next(err);
              }if(message.length>0){
                fullConversations.push(message);
              }
              if(index+1 === conversations.length) {
                return res.status(200).json({ conversations: fullConversations });
              }
            });
        });
    });
  });
}
