import nodeMailer from 'nodemailer';
import mandrillTransport from 'nodemailer-mandrill-transport';
import User from '../models/user';
const transport = nodeMailer.createTransport(mandrillTransport({
  auth: {
    apiKey: process.env.MandrilKey
  }
}));
export function send_email(charge) {
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
