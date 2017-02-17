import nodeMailer from 'nodemailer';
import mandrillTransport from 'nodemailer-mandrill-transport';
import User from '../models/user';
import PurchaseOrder from '../models/purchaseorder';
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
    })
  })
}

export function confrim_order_mail(purchaseorder){
  PurchaseOrder.findOne({_id: purchaseorder._id})
    .populate({
      path: '_buyer',
      select: 'first_name last_name email',
    })
    .populate({
      path: '_producer',
      select: '-products',
       model: 'User',
    })
    .populate({
      path: '_order',
      model: 'Order',
    populate: {
      path: 'orderitems',
      model: 'OrderItem',
    populate: {
      path: '_product',
      model: 'Product'
    }}}).exec((err, porder)=>{
    if (err) {
      console.log(err)
    }
    else{
      if ((porder._order.delivery_method == 'budmat') || (porder._order.delivery_method == 'sendemat')) {
        budmat_sendemat_email(porder)
      }
      if (porder._order.delivery_method == 'hentemat') {
        hentemat_order(porder)
      }
    }
  })
}

function budmat_sendemat_email(porder){
  let order_arr = []
  porder._order.orderitems.forEach(function(orderitem, index){
    let data = {}
    data.name = orderitem._product.product_name
    data.qty = orderitem.product_qty
    data.description = orderitem._product.description
    data.price = orderitem._product.base_price
    data.ordPrice = orderitem.total_price
    data.img = orderitem._product.photo
    order_arr.push(data)
    if (porder._order.orderitems.length == index+1){
      order_arr
    }
  })
  transport.sendMail({
    mandrillOptions: {
      template_name: 'Order verification mail (budmat)',
      template_content: [],
      message: {
        to: [ {email: porder._buyer.email} ],
        subject: 'Order successfully placed' ,
        from_email: 'noreply@bazeat.no',
        "merge": true,
        "merge_language": "handlebars",
        "merge_vars": [
          {
            "rcpt": porder._order.address.email,
            "vars": [
              {
                  "name": "ORDERNUMBER",
                  "content": "PO" + porder._order.orderId
              },
              {
                  "name": "orderdate",
                  "content": porder._order.createdAt.toDateString()
              },
              {
                  "name": "products",
                  "content": order_arr
              },
              {
                  "name": "SUBTOTAL",
                  "content": (porder._order.net_price).toFixed(2)
              },
              {
                  "name": "SHIPPINPRICE",
                  "content": (porder._order.shipment_price).toFixed(2)
              },
              {
                  "name": "ORDTOTAL",
                  "content": (porder._order.total_amount).toFixed(2)
              },
              {
                  "name": "FNAME",
                  "content": porder._order.address.first_name
              },
              {
                  "name": "LNAME",
                  "content": porder._order.address.last_name
              },
              {
                  "name": "ADDRESSLINE1",
                  "content": porder._order.address.line1
              },
              {
                  "name": "POSTNO",
                  "content": porder._order.address.postal_code
              },
              {
                  "name": "CITY",
                  "content": porder._order.address.city
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
}


export function hentemat_order(porder){
  let order_arr = []
  let p_name, p_address, p_city, p_country, p_post_code, p_ph_no
  if ((porder._producer.if_producer == true) && (porder._producer.if_user == false)) {
    p_address = porder._producer.producer_info.cmp_address
    p_city = porder._producer.producer_info.cmp_city
    p_country = porder._producer.producer_info.cmp_country
    p_post_code = porder._producer.producer_info.cmp_postal_code
    p_ph_no = porder._producer.producer_info.cmp_phone_number
  }
  if ((porder._producer.if_user == true) && (porder._producer.if_producer == false)) {
    p_address = porder._producer.address
    p_city = porder._producer.city
    p_country = porder._producer.country
    p_post_code = porder._producer.postal_code
    p_ph_no = porder._producer.phone
  }
  porder._order.orderitems.forEach(function(orderitem, index){
    let data = {}
    data.name = orderitem._product.product_name
    data.qty = orderitem.product_qty
    data.description = orderitem._product.description
    data.price = orderitem._product.base_price
    data.ordPrice = orderitem.total_price
    data.img = orderitem._product.photo
    order_arr.push(data)
    if (porder._order.orderitems.length == index+1){
      order_arr
    }
  })
  transport.sendMail({
    mandrillOptions: {
      template_name: 'Order verification mail (hentemat)',
      template_content: [],
      message: {
        to: [ {email: porder._buyer.email} ],
        subject: 'Order successfully placed' ,
        from_email: 'noreply@bazeat.no',
        "merge": true,
        "merge_language": "handlebars",
        "merge_vars": [
          {
            "rcpt": porder._buyer.email,
            "vars": [
              {
                "name": "ORDERNUMBER",
                "content": "PO" + porder._order.orderId
              },
              {
                "name": "orderdate",
                "content": porder._order.createdAt.toDateString()
              },
              {
                "name": "products",
                "content": order_arr
              },
              {
                "name": "SUBTOTAL",
                "content": (porder._order.net_price).toFixed(2)
              },
              {
                "name": "ORDTOTAL",
                "content": (porder._order.total_amount).toFixed(2)
              },
              {
                "name": "PRODUCERPHONENO",
                "content": p_ph_no
              },
              {
                "name": "PRODUCERNAME",
                "content": porder._producer.full_name
              },
              {
                "name": "PRODUCEREMAIL",
                "content": porder._producer.email
              },
              {
                "name": "ADDRESSLINE1",
                "content": p_address
              },
              {
                "name": "POSTNO",
                "content": p_post_code
              },
              {
                "name": "CITY",
                "content": "need to set"
              },
              {
                "name": "PICKUPDAY",
                "content": "need to set"
              },
              {
                "name": "PICKUPMONTH",
                "content": "need to set"
              },
              {
                "name": "PICKUPDAYNO",
                "content": "need to set"
              },
              {
                "name": "PICKUPTIME",
                "content": "need to set"
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
}
