import nodeMailer from 'nodemailer';
import mandrillTransport from 'nodemailer-mandrill-transport';
const transport = nodeMailer.createTransport(mandrillTransport({
  auth: {
    apiKey: process.env.MandrilKey
  }
}));
export function send_email(charge) {
  transport.sendMail({
  from: 'noreply@bazeat.com',
  to: charge.email,
  // to: 'get.atifhabib@gmail.com',
  subject: 'Hello',
  html: '<p>How are you?</p>'
  },
  function (err, info) {
    console.log("jjjjj")
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  }
);
}
