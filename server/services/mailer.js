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


export  function cancel_account_to_user(user){
  transport.sendMail({
      mandrillOptions: {
        template_name: 'Cancel account',
        template_content: [],
        message: {
          to: [ {email: user.email} ],
          subject: 'Your account has been cancelled',
          from_email: 'noreply@bazeat.no',
          "merge_vars": [
            {
              "rcpt": user.email,
              "vars": [
                {
                    "name": "FNAME",
                    "content": user.full_name
                },
                {
                    "name": "MESSAGEBODY",
                    "content": "Hope to see you soon"
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
    }
  )
}

export function message_email(message, sender) {
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

export function review_email(review, sender){
  User.findOne({ _id: review.reviewed_for }).exec((err, recipient) => {
    transport.sendMail({
      mandrillOptions: {
        template_name: 'New review',
        template_content: [],
        message: {
          to: [ {email: recipient.email} ],
          subject: 'New Review from '+ sender.full_name,
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
                      "name": "REVIEWBODY",
                      "content": review.review
                  },
                  {
                    "name": "SENDERSRC",
                    "content": sender.photo
                  },
                  {
                    "name": "REVIEWLINK",
                    "content": process.env.SiteUrl + 'review'
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

export function replied_review_mail(comment, review, sender){
  User.findOne({_id: review.reviewed_by}).exec((err, recipient) => {
    transport.sendMail({
        mandrillOptions: {
          template_name: 'Review answer',
          template_content: [],
          message: {
            to: [ {email: recipient.email} ],
            subject: user.full_name + 'answered your review' ,
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
                        "name": "COMMENTBODY",
                        "content": comment.comment
                    },
                    {
                      "name": "SENDERSRC",
                      "content": sender.photo
                    },
                    {
                      "name": "REPLIEDLINK",
                      "content": process.env.SiteUrl + 'review'
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
      }
    )
  })
}


export function budmat_order(order){
  let order_arr = []
  let data = {}
  order.orderitems.forEach(function(orderitem, index){
    console.log('orderitem._product')
    console.log(orderitem._product)
    console.log('orderitem[0]._product')
    console.log(orderitem[0]._product)
    data.name = orderitem._product.product_name
    data.qty = orderitem.product_qty
    data.description = orderitem._product.description
    data.price = orderitem._product.base_price
    data.ordPrice = orderitem.total_price
    data.img = orderitem._productphoto
    order_arr.push(data)
    if (orders.orderitems.length == index+1){
      order_arr
    }
    console.log('order_arr')
    console.log(order_arr)
  })
  transport.sendMail({
        mandrillOptions: {
          template_name: 'Order verification mail (budmat)',
          template_content: [],
          message: {
            to: [ {email: user.email} ],
            subject: user.full_name + 'answered your review' ,
            from_email: 'noreply@bazeat.no',
            "merge": true,
            "merge_language": "handlebars",
            "merge_vars": [
            {
                "rcpt": user.email,
                "vars": [
                    {
                        "name": "ordNumber",
                        "content": "478366238"
                    },
                    {
                        "name": "products",
                        "content": [
                            {
                                "img": "http://kbcdn.mandrill.com/nesting-penguin.png",
                                "qty": 2,
                                "sku": "PENG001",
                                "name": "Penguin",
                                "description": "Solid wood, hand-painted penguin nesting doll with 5 different sizes included. Limited Edition.",
                                "price": "12.99",
                                "ordPrice": "25.98"
                            },
                            {
                                "img": "http://kbcdn.mandrill.com/nesting-bear.png",
                                "qty": 3,
                                "sku": "BBEAR001",
                                "name": "Brown bear",
                                "description": "Solid wood, hand-painted brown bear nesting doll. Coordinates with our entire Bear collection. Includes 6 nested sizes.",
                                "price": "12.99",
                                "ordPrice": "38.97"
                            },
                            {
                                "img": "http://kbcdn.mandrill.com/nesting-tiger.png",
                                "qty": 1,
                                "sku": "TIGER030",
                                "name": "Tiger",
                                "description": "Orange striped tiger from our jungle collection.",
                                "price": "37.99",
                                "ordPrice": "37.99"
                            }
                        ]
                    },
                    {
                        "name": "subtotal",
                        "content": "102.94"
                    },
                    {
                        "name": "shipping",
                        "content": "4.95"
                    },
                    {
                        "name": "ordTotal",
                        "content": "107.89"
                    },
                    {
                        "name": "customerName",
                        "content": [
                            {
                                "firstName": "Monty",
                                "lastName": "Python"
                            }
                        ]
                    },
                    {
                        "name": "coupon",
                        "content": [
                            {
                                "code": "THANKS",
                                "description": "15% off"
                            }
                        ]
                    },
                    {
                        "name": "billingAddress",
                        "content": [
                            {
                                "streetNum": "1234",
                                "address1": "BoulevArd Lane",
                                "city": "ATLANTA",
                                "state": "ga",
                                "zip": 30030
                            }
                        ]
                    },
                    {
                        "name": "shippingAddress",
                        "content": [
                            {
                                "streetNum": 5678,
                                "address1": "BoulevArd Lane",
                                "city": "atlanta",
                                "state": "ga",
                                "zip": 30328
                            }
                        ]
                    },
                    {
                        "name": "member",
                        "content": true
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
      }
    )
}
