import twilio from 'twilio';
import User from '../models/user';
let client = new twilio.RestClient(process.env.TwilioSid, process.env.TwilioToken);

export function sendMessage(to_number) {
  console.log(to_number)
  client.sms.messages.create({
      to:'+91' + to_number,
      from:'+15005550006',
      body:'ahoy hoy! Testing Twilio and node.js'
    }, function(error, message) {
      if (!error) {
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
      }
      else {
        console.log(error);
        console.log('Oops! There was an error.');
      }
  });
}


export function orderFullfilled(order){
  User.find(_id: order._buyer).exec((user)  =>{
    client.sms.messages.create({
      to:'+91' + user.number,
      from:'+15005550006',
      body:'Your order has been fullfilled'
      }, function(error, message) {
        if (!error) {
          console.log('Success! The SID for this SMS message is:');
          console.log(message.sid);
          console.log('Message sent on:');
          console.log(message.dateCreated);
        }
        else {
          console.log(error);
          console.log('Oops! There was an error.');
        }
    });
  })
}
