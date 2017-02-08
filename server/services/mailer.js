import nodeMailer from 'nodemailer';
import mandrillTransport from 'nodemailer-mandrill-transport';
import User from '../models/user';
const transport = nodeMailer.createTransport(mandrillTransport({
  auth: {
    apiKey: process.env.MandrilKey
  }
}));
export function send_email(charge) {
  console.log('charge')
  console.log(charge.email)
  transport.sendMail({
    from: 'noreply@bazeat.no',
    to: charge.email,
    // to: 'get.atifhabib@gmail.com',
    subject: 'Hello',
    html: '<p>How are you?</p>'
    },
    function (err, info) {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    }
  );
}

export function orderFullfilled(order){
  User.find(_id: order._buyer).exec((user)  =>{
    transport.sendMail({
      from: 'noreply@bazeat.no',
      to: user.email,
      // to: 'get.atifhabib@gmail.com',
      subject: 'Order Fullfilled',
      html: '<p>You order has been fullfilled</p>'
      },
      function (err, info) {
        if (err) {
          console.error(err);
        } else {
          console.log(info);
        }
      }
    );
  })
}


export  function cancel_account(email){
   User.find({ email: email }).exec((err, user) => {
    console.log('user')
    console.log(user)
    if (err) {
      return res.status(422).send(err);
    }
    else {
      transport.sendMail({
        template_name: 'cancel-account',
        template_content:[],
        message: {
          headers: {
            'Reply-To': 'test@tet.com'
          },
          firstName: user.first_name,
          subject: 'About Account Cancellation',
          messageId: 'test',
          from_email: 'sender@example.com',
          from_name: 'bernie senders',
          to: [{
            email: user.email,
            name: user.first_name,
            type: 'to'
          }]
        },
        function (err, info) {
          if (err) {
            console.error(err);
          } else {
            console.log(info);
          }
        }
      })
    }
  })
}

export function new_message(message, sender) {
  User.findOne({ _id: message.receiver }).exec((err, recipient) => {
    transport.sendMail({
      mandrillOptions: {
        template_name: 'send message',
        template_content: [],
        message: {
          to: [ {email: recipient.email} ],
          subject: 'New Message from '+ sender.full_name,
          from_email: 'noreply@bazeat.no',
          "merge_vars": [
            {
              "rcpt": recipient.email,
              "vars": [
                  {
                      "name": "FNAME",
                      "content": sender.full_name
                  },
                  {
                      "name": "MESSAGEBODY",
                      "content": message.body
                  },
                  {
                    "name": "SENDERSRC",
                    "content": sender.photo
                  },
                  {
                    "name": "MESSAGELINK",
                    "content": process.env.SiteUrl + 'message'
                  }
              ]
            }
          ]
        }
      }
    },
    function (err, info) {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    })
  })
}


// transport.sendMail({
//   template_name: 'contact-form',
//   template_content: [],
//   subject: 'Hello',
//   from: 'bernie senders sender@example.com',
//   to: 'user@example.com, user2@example.com',
//   cc: 'cc@example.com, cc@example.com',
//   bcc: [
//     'foobar@blurdybloop.com', {
//       name: 'Майлер, Ноде',
//       address: 'foobar@blurdybloop.com'
//     }
//   ],
//   replyTo: 'test@tet.com',
//   messageId: 'test',
// });
