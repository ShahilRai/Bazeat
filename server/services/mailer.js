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
  console.log('order')
  console.log(order)
  User.findOne({_id: order._buyer}).exec((err, user) =>{
      let order_arr = []
      order.orderitems.forEach(function(orderitem, index){
        let data = {}
        data.name = orderitem._product.product_name
        data.qty = orderitem.product_qty
        data.description = orderitem._product.description
        data.price = orderitem._product.base_price
        data.ordPrice = orderitem.total_price
        data.img = orderitem._product.photo
        order_arr.push(data)
        if (order.orderitems.length == index+1){
          order_arr
        }
      })
      transport.sendMail({
            mandrillOptions: {
              template_name: 'Order verification mail (budmat)',
              template_content: [],
              message: {
                to: [ {email: user.email} ],
                subject: 'Order successfully placed' ,
                from_email: 'noreply@bazeat.no',
                "merge": true,
                "merge_language": "handlebars",
                "merge_vars": [
                {
                    "rcpt": user.email,
                    "vars": [
                        {
                            "name": "ORDERNUMBER",
                            "content": "PO" + order.orderId
                        },
                        {
                            "name": "ORDERDATE",
                            "content": order.createdAt.toDateString()
                        },
                        {
                            "name": "products",
                            "content": order_arr
                        },
                        {
                            "name": "SUBTOTAL",
                            "content": (order.net_price).toFixed(2)
                        },
                        {
                            "name": "SHIPPINPRICE",
                            "content": (order.shipment_vat_value).toFixed(2)
                        },
                        {
                            "name": "ORDTOTAL",
                            "content": (order.total_amount).toFixed(2)
                        },
                        {
                            "name": "FNAME",
                            "content": order.address.first_name
                        },
                        {
                            "name": "LNAME",
                            "content": order.address.last_name
                        },
                        {
                            "name": "ADDRESSLINE1",
                            "content": order.address.line1
                        },
                        {
                            "name": "POSTNO",
                            "content": order.address.postal_code
                        },
                        {
                            "name": "CITY",
                            "content": order.address.city
                        },
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
