import Express from 'express';
import ExpressStrompath from 'express-stormpath';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import aws from 'aws-sdk';

// import IntlWrapper from '../client/modules/Intl/IntlWrapper';
// import twilio from 'twilio';
// import nodeMailer from 'nodemailer';
// import mandrillTransport from 'nodemailer-mandrill-transport';
// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();
// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  // app.use(webpackHotMiddleware(compiler));
}

app.use('/css', Express.static(path.resolve(__dirname, '../client/css')));
app.use('/images', Express.static(path.resolve(__dirname, '../client/images')));
app.use('/javascript', Express.static(path.resolve(__dirname, '../client/javascript')));
app.use('/fonts', Express.static(path.resolve(__dirname, '../client/fonts')));
// React And Redux Setup
// import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
// import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import posts from './routes/post.routes';
import users from './routes/user.routes';
import producers from './routes/producer.routes';
import orders from './routes/order.routes';
import products from './routes/product.routes';
import profiles from './routes/profile.routes';
import admin from './routes/admin/authenticate.routes';
import admin_users from './routes/admin/users.routes';
import admin_products from './routes/admin/products.routes';
import dummyData from './dummyData';
import serverConfig from './config';
import User from './models/user';
import Product from './models/product';
import cuid from 'cuid';
import multer from 'multer';
import multerS3 from 'multer-s3';
import passport from 'passport';
import './models/admin'
import './config/passport'
// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
  // feed some dummy data in DB.
  dummyData();
});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(Express.static(path.resolve(__dirname, '../dist')));

app.use('/api', posts);
app.use('/api', users);
app.use('/api', producers);
app.use('/api', orders);
app.use('/api', products);
app.use('/api', profiles);



// Admin Routes Defination
  app.use('/api/admin/authenticate', admin);
  app.use('/api/admin/users', admin_users);
  app.use('/api/admin/products', admin_products);
// Admin Routes Defination


app.use(ExpressStrompath.init(app, {
  web: {
    produces: ['application/json'],
    me: {
      expand: {
        customData: true
      }
    },
    register: {
      form: {
        fields: {
          is_producer: {
            enabled: true,
            type: 'hidden'
          }
        }
      }
    }
  },
  preRegistrationHandler: function (formData, req, res, next) {
    console.log('Got registration request', formData);
    next();
  },

  postRegistrationHandler: function (account, req, res, next) {
    console.log('User:', account.email, 'just registered!');
    const newUser = new User({full_name: account.fullName, unique_id: account.href, email: account.email, if_producer: account.if_producer});
    newUser.cuid = cuid();
    newUser.save((err, saved) => {
      if (err) {
        console.log('err')
        console.log(err)
        res.status(500).send(err);
      }
    });
    next()
  }
}));

app.post('/me', bodyParser.json(), ExpressStrompath.loginRequired,
  function (req, res) {
  function writeError(message) {
    res.status(400);
    res.json({ message: message, status: 400 });
    res.end();
  }
    console.log(req.body)
  function saveAccount() {
    req.user.givenName = req.body.givenName;
    req.user.surname = req.body.surname;
    req.user.email = req.body.email;
    req.user.save(function (err) {
    // Producer info params
    let business_name = req.body.business_name;
    let org_number = req.body.org_number;
    let sub_to_vat = req.body.sub_to_vat;
    let cmp_web_site = req.body.cmp_web_site;
    let cmp_description = req.body.cmp_description;
    let cmp_phone_number = req.body.cmp_phone_number;
    let cmp_city = req.body.cmp_city;
    let cmp_address = req.body.cmp_address;
    let cmp_postal_code = req.body.cmp_postal_code;
    let cmp_delivery_options = req.body.cmp_delivery_options;
    // Producer info params
    // User info params
    let gender = req.body.gender;
    // User info params

      if (err) {
        // return writeError(err.userMessage || err.message);
        res.json({ error: err });
      }
      User.findOne({ email: req.body.email }).exec((err, user) => {
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.description = req.body.desc;
        user.city = req.body.city;
        user.country = req.body.country;
        user.address = req.body.address;
        user.birth_date = req.body.birth_date;
        user.postal_code = req.body.postal_code;
        user.save((error, saveduser) => {
          if (error) {
            res.status(500).send(error);
          }
          if(saveduser.if_producer == true ){
            let producer_info = saveduser.producer_info;
            producer_info.business_name = business_name;
            producer_info.org_number = org_number;
            producer_info.sub_to_vat = sub_to_vat;
            producer_info.cmp_web_site = cmp_web_site;
            producer_info.cmp_description = cmp_description;
            producer_info.cmp_phone_number = cmp_phone_number;
            producer_info.cmp_city = cmp_city;
            producer_info.cmp_address = cmp_address;
            producer_info.cmp_postal_code = cmp_postal_code;
            producer_info.cmp_delivery_options = cmp_delivery_options;
            // producer_info.company_description = producer_companydescription;
          }
          else{
            // To be added for user profile
            let user_info = saveduser.user_info;
            user_info.gender = gender;
            // user_info.contact_person = ;
            // To be added for user profile
          }
          saveduser.save(function (err, saveduser1) {
            console.log(saveduser1)
            res.json({ user: saveduser1 });
          });
        });
      });
    });
  }

  if (req.body.password) {
    var application = req.app.get('stormpathApplication');

    application.authenticateAccount({
      username: req.user.username,
      password: req.body.existingPassword
    }, function (err) {
      if (err) {
        return writeError('The existing password that you entered was incorrect.');
      }

      req.user.password = req.body.password;

      saveAccount();
    });
  } else {
    saveAccount();
  }
});

app.on('ExpressStrompath.ready', () => {
  // console.log('Stormpath Ready');
});

// upload profile image

let s3 = new aws.S3({ accessKeyId: process.env.AWSKey, secretAccessKey: process.env.AWSSecret })

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWSBucket,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, 'profile-image/'+ Date.now().toString() + file.originalname);
    }
  })
})

app.post('/api/profile_image', upload.single('image'), function (req, res, next){
  User.findOne({ email: req.body.email }).exec((err, user) => {
    user.photo = req.file.location
    user.save((error, saveduser) => {
      if (error) {
        res.status(500).send(error);
      }
      console.log(saveduser.photo)
      res.json({ image_url: saveduser.photo });
    });
  });
})

app.post('/api/products', upload.single('image'), function (req, res, next){
  console.log("req")
  console.log(req.body.fieldValues)
  User.findOne({ email: req.body.fieldValues.email }).exec((error, user) => {
    const newProduct = new Product(req.body.fieldValues);
    newProduct.cuid = cuid();
    newProduct._producer = user._id;
    // newProduct.photo = req.file.location;
    newProduct.save((err, product) => {
     if (err) {
       res.status(500).send(err);
     }
     res.json({ product: product });;
    });
  });
})


app.post('/api/product_image', upload.single('image'), function (req, res, next){
  Product.findOne({ cuid: req.body.cuid }).exec((err, product) => {
    product.photo = req.file.location
    product.save((error, savedproduct) => {
      if (error) {
        res.status(500).send(error);
      }
      console.log(savedproduct.photo)
      res.json({ image_url: savedproduct.photo });
    });
  });
})

// app.get('/', ExpressStrompath.loginRequired, function(req, res) {
//   res.send('Welcome back: ' + res.locals.user.email);
// });

// let client = new twilio.RestClient(process.env.TwilioSid, process.env.TwilioToken);

// client.sms.messages.create({
//     to:'+917840827410',
//     from:'+16318134710',
//     body:'ahoy hoy! Testing Twilio and node.js'
// }, function(error, message) {
//     // The HTTP request to Twilio will run asynchronously. This callback
//     // function will be called when a response is received from Twilio
//     // The "error" variable will contain error information, if any.
//     // If the request was successful, this value will be "falsy"
//     if (!error) {
//         // The second argument to the callback will contain the information
//         // sent back by Twilio for the request. In this case, it is the
//         // information about the text messsage you just sent:
//         console.log('Success! The SID for this SMS message is:');
//         console.log(message.sid);

//         console.log('Message sent on:');
//         console.log(message.dateCreated);
//     } else {
//         console.log(error);
//         console.log('Oops! There was an error.');
//     }
// });

// const transport = nodeMailer.createTransport(mandrillTransport({
//   auth: {
//     apiKey: process.env.MandrilKey
//   }
// }));

// transport.sendMail({
//   from: 'sender@example.com',
//   to: 'user@example.com',
//   subject: 'Hello',
//   html: '<p>How are you?</p>'
// },
// function (err, info) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(info);
//   }
// });

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/html/index.html'));
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
