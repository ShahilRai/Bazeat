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
          select: 'full_name photo email'
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
  Conversation.findOne({_id: req.params.conversation_id})
  .populate({
    path: 'messages',
    options: { sort: { 'createdAt': 1 } },
    populate: {
      path: 'receiver sender',
      model: 'User',
      select: 'full_name photo email'
    }
  })
  .exec(function(err, conversation) {
    if(err) {
      return res.status(422).json({ err });
    } else {
      return res.status(200).json({ messages: conversation.messages });
    }
  })
}

export function newConversation(req, res) {
  if(!req.query.recipient_id) {
    return res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
  }
  if(!req.body.composedMessage) {
    return res.status(422).send({ error: 'Please enter a message.' });
  }
  User.findOne({ email: req.body.email }).exec((err, user) => {
    Conversation.findOne({participants: [user._id, req.query.recipient_id]}).exec(function(err,conversation){
      if(conversation) {
        newMessage(conversation, null, res, user, req)
      }
      else {
        const conversation = new Conversation({
          participants: [user._id, req.query.recipient_id]
        });
        conversation.save(function(err, newConversation) {
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

export function newMessage(conversation, next, res, user, req){
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
        .populate({
          path: 'sender receiver',
          select: 'full_name photo email'
        })
        .exec(function(err, message) {
          if (err) {
            return res.status(422).json({ err });
          } else {
            return res.status(200).json(message);
          }
      });
    });
  });
}

export function msgCount(req, res) {
  User.findOne({ email: req.query.email }).exec((err, user) => {
    if(err || user == null){
      res.status(422).send({err});
    }
    else {
      Conversation.find({ participants: user._id })
      .populate({
        path: 'messages',
        match: {unread: true, receiver: user._id},
        options: { limit: 1, sort: { 'createdAt': -1 } },
        populate: {
          path: 'receiver sender',
          model: 'User',
          select: 'full_name photo email'
        }
      }).limit(2).sort('-updatedAt')
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
