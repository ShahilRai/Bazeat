import  Conversation from '../models/conversation';
import  Message from '../models/message';
import  User from '../models/user';
import * as MailService from '../services/mailer';
import * as MessageService from '../services/twillio';


export function allConversations(req, res, next) {
  User.findOne({ email: req.query.email }).exec((err, user) => {
    if(err || user == null){
      res.status(422).send({err});
    }
    else {
      Conversation.find({ participants: user._id })
      .populate({
        path: 'messages',
        options: { limit: 1, sort: { 'createdAt': -1 } },
        populate: {
          path: 'receiver sender',
          model: 'User',
          select: 'full_name photo'
        }
      }).sort('-updatedAt')
        .exec(function(err, conversations) {
          if (err) {
            res.send({ error: err });
            return next(err);
          }
          return res.status(200).json({ conversations: conversations });
      });
    }
  });
}

export function getConversation(req, res, next) {
  console.log('req.params.conversation_id')
  console.log(req.params.conversation_id)
  Message.update({conversation_id: req.params.conversation_id}, {unread: false}, {multi: true, new: true}).exec(function(err, updated_messages) {
    if(err) {
      return res.status(422).json({ err });
    } else {
      Message.find({ conversation_id: req.params.conversation_id })
        .select('createdAt body sender receiver')
        .sort('createdAt')
        // .limit(2)
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
            return res.status(422).json({ err });
            return next(err);
          } else {
            return res.status(200).json({ messages });
          }
      });
    }
  })
}

export function newConversation(req, res) {
  let conv
  if(!req.query.recipient_id) {
    return res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
  }
  if(!req.body.composedMessage) {
    return res.status(422).send({ error: 'Please enter a message.' });
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
    MailService.message_email(newMessage, user)
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
      MailService.message_email(sentReply, user)
        Message.findOne({_id: sentReply._id })
          .select('createdAt updatedAt body sender receiver conversation_id')
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
              return res.status(422).json({ err });
            } else {
              console.log(message)
              return res.status(200).json(message);
            }
        });

    });
  });
}

export function msgCount(req, res){
  User.findOne({ email: req.query.email }).exec((err, user) => {
    Conversation.find({ participants: user._id })
      .sort('-updatedAt')
      .limit(2)
      .select('_id')
      .exec(function(err, conversations) {
        console.log('conversations')
        console.log(conversations)
        if (err) {
          res.send({ error: err });
          return next(err);
        }
        // Set up empty array to hold conversations + most recent message
        let fullConversations = [];
        conversations.forEach(function(conversation, index) {
          Message.find({ 'conversation_id': conversation._id, receiver: user._id, unread: true})
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
