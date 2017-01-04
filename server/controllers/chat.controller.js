import  Conversation from '../models/conversation'
import  Message from '../models/message'
import  User from '../models/user'


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
          Message.find({ 'conversation_id': conversation._id })
            .sort('-createdAt')
            .populate({
              path: 'sender',
              select: 'full_name'
            })
            .populate({
              path: 'receiver',
              select: 'full_name'
            })
            .exec(function(err, message) {
              if (err) {
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
  Message.find({ conversation_id: req.params.conversation_id })
    .select('createdAt body sender receiver')
    .sort('-createdAt')
    .populate({
      path: 'sender',
      select: 'full_name'
    })
    .populate({
      path: 'receiver',
      select: 'full_name'
    })
    .exec(function(err, messages) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      res.status(200).json({ conversation: messages });
    });
}


export function newConversation(req, res, next) {
   if(!req.params.recipient_id) {
    res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    return next();
  }
  if(!req.body.composedMessage) {
    res.status(422).send({ error: 'Please enter a message.' });
    return next();
  }
  User.findOne({ email: req.body.email }).exec((err, user) => {
    const conversation = new Conversation({
      participants: [user._id, req.params.recipient_id]
    });
    conversation.save(function(err, newConversation) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      const message = new Message({
        conversation_id: newConversation._id,
        body: req.body.composedMessage,
        sender: user._id,
        receiver: req.params.recipient_id
      });

      message.save(function(err, newMessage) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }

        res.status(200).json({ message: 'Conversation started!', conversation_id: conversation._id });
        return next();
      });
    });
  });
}

export function sendReply(req, res, next) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    const reply = new Message({
      conversation_id: req.params.conversation_id,
      body: req.body.composedMessage,
      sender: user._id,
      receiver: req.params.recipient_id
    });
    reply.save(function(err, sentReply) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      res.status(200).json({ message: 'Reply successfully sent!' });
      return(next);
    });
  });
}