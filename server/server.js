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
app.use('/js', Express.static(path.resolve(__dirname, '../client/js')));
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
import search from './routes/search.routes';
import purchaseorder from './routes/purchaseorder.routes';
import admin from './routes/admin/authenticate.routes';
import admin_users from './routes/admin/users.routes';
import admin_products from './routes/admin/products.routes';
import static_pages from './routes/admin/pages.routes';
import chat from './routes/chat.routes';
import cart from './routes/cart.routes';
import comment from './routes/comment.routes';
import dummyData from './dummyData';
import serverConfig from './config';
import User from './models/user';
import Product from './models/product';
import cuid from 'cuid';
import multer from 'multer';
import multerS3 from 'multer-s3';
import passport from 'passport';
import NodeGeocoder from 'node-geocoder';
import './models/admin'
import './config/passport'
import logout from 'express-passport-logout'
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
app.use('/api', search);
app.use('/api', purchaseorder);
app.use('/api', chat);
app.use('/api', comment);
app.use('/api', cart);

// Admin Routes Defination
  app.use('/api/admin/authenticate', admin);
  app.use('/admin', admin_users);
  app.use('/admin', admin_products);
  app.use('/admin', static_pages);
// Admin Routes Defination

let geocodeoptions = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: process.env.GEOCODEAPI, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
let geocoder = NodeGeocoder(geocodeoptions);

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
            name: 'is_producer',
            type: 'hidden'
          }
        }
      }
    },
    changePassword: {
      autoLogin: false,
    }
  },
  preRegistrationHandler: function (formData, req, res, next) {
    console.log('Got registration request', formData);
    next();
  },
  expandCustomData: true,
  postRegistrationHandler: function (account, req, res, next) {
    account.getCustomData(function(err, data) {
      console.log('User:', account.email, 'just registered!');
      const newUser = new User({full_name: account.fullName, unique_id: account.href, email: account.email, first_name: account.givenName, last_name: account.surname});
      newUser.cuid = cuid();
      if (data.is_producer == 'true'){
        newUser.if_producer = true;
      }
      newUser.save((err, saved) => {
        if (err) {
           return res.status(422).send(err);
        }
      });
      next()
    });
  }
}));

app.post('/me', bodyParser.json(), ExpressStrompath.loginRequired,
  function (req, res) {
  function writeError(message) {
    res.status(400);
    return res.json({ message: message, status: 400 });
  }
  function saveAccount() {
    req.user.givenName = req.body.givenName;
    req.user.surname = req.body.surname;
    req.user.email = req.body.email;
    req.user.save(function (err) {
    // Producer info params

    let sub_to_vat = false;
    if (req.body.sub_to_vat == 'Yes'){
        sub_to_vat = true;
      }
    let business_name = req.body.business_name;
    let org_number = req.body.org_number;
    let cmp_web_site = req.body.cmp_web_site;
    let cmp_description = req.body.cmp_description;
    let cmp_phone_number = req.body.cmp_phone_number;
    let cmp_contact_person = req.body.cmp_contact_person;
    let cmp_city = req.body.cmp_city;
    let cmp_address = req.body.cmp_address;
    let cmp_country = req.body.cmp_country;
    let cmp_postal_code = req.body.cmp_postal_code;
    // Producer info params
    // User info params
    let gender = req.body.gender;
    // User info params

      if (err) {
        // return writeError(err.userMessage || err.message);
        res.json({ error: err });
      }
      User.findOne({ email: req.body.email }).exec((err, user) => {
        if (err){
          return  res.status(422).send(err);
        }
        else{
          user.email = req.body.email;
          user.phone = req.body.phone;
          user.description = req.body.desc;
          user.city = req.body.city;
          user.sub_to_vat = sub_to_vat
          user.country = req.body.country;
          user.address = req.body.address;
          user.birth_date.day = req.body.day;
          user.birth_date.month = req.body.month;
          user.birth_date.year = req.body.year;
          user.postal_code = req.body.postal_code;
          user.delivery_options = req.body.delivery_options
          user.account_number = req.body.account_number;
          // user.profile_added = req.body.profile_added;
          user.profile_added = true;
          user.save((error, saveduser) => {
            let data = [];
          if(saveduser.if_producer == true){
            data[0] = (saveduser.address + ', ' + saveduser.country + ', ' + saveduser.postal_code)
            data[1] = (req.body.cmp_address + ', ' + req.body.cmp_country + ', ' + req.body.cmp_postal_code)
          }
          else
          {
            data[0] = (saveduser.address + ', ' + saveduser.country + ', ' + saveduser.postal_code)
          }
            // let address_data = (req.body.address + ', ' + req.body.country + ', ' + req.body.postal_code)
            // let cmp_address_data = (req.body.cmp_address + ', ' + req.body.cmp_country + ', ' + req.body.cmp_postal_code)
            geocoder.batchGeocode((data), function(err, response) {
              if (err || response[0].value.length <= 0){
                return res.status(422).send({err: "Invalid address details"});
              }
              else {
                saveduser.loc= [response[0].value[0].longitude, response[0].value[0].latitude]
                saveduser.save (function (err, user1) {
                  if (err) {
                    // console.log(err)
                    return res.status(422).send(err);
                  }
                  if(user1.if_producer == true ){
                    let producer_info = user1.producer_info;
                    producer_info.business_name = business_name;
                    producer_info.org_number = org_number;
                    producer_info.sub_to_vat = sub_to_vat;
                    producer_info.cmp_web_site = cmp_web_site;
                    producer_info.cmp_phone_number = cmp_phone_number;
                    producer_info.cmp_contact_person = cmp_contact_person;
                    producer_info.cmp_city = cmp_city;
                    producer_info.cmp_address = cmp_address;
                    producer_info.cmp_country = cmp_country;
                    producer_info.cmp_postal_code = cmp_postal_code;
                    producer_info.cmp_loc = [response[1].value[0].longitude, response[1].value[0].latitude]
                    // Added for time slot
                    console.log(req.body)
                    // producer_info.timeslots.push(req.body.timeslots)
                    // Added for time slot
                    // producer_info.company_description = producer_companydescription;
                  }
                  else{
                    // To be added for user profile
                    let user_info = user1.user_info;
                    user_info.gender = gender;
                    // user_info.contact_person = ;
                    // To be added for user profile
                  }
                  user1.save(function (err, saveduser1) {
                    console.log(saveduser1)
                    return res.json({ user: saveduser1 });
                  });
                });
              }
            });
          });
        }
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
  }
  else {
    saveAccount();
  }
});

app.on('ExpressStrompath.ready', () => {
  // console.log('Stormpath Ready');
});

// upload profile image
let s3 = new aws.S3({ accessKeyId: process.env.AWSKey, secretAccessKey: process.env.AWSSecret })

let profileupload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWSBucket,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, 'profile-image/'+ Date.now().toString() + file.originalname);
    }
  })
})

let productupload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWSBucket,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, 'products/'+ Date.now().toString() + file.originalname);
    }
  })
})

let bg_img_upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWSBucket,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, 'bg_img/'+ Date.now().toString() + file.originalname);
    }
  })
})

app.post('/api/profile_image', profileupload.single('image'), function (req, res, next){
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
        return  res.status(422).send(err);
    }
    else{
      user.photo = req.file.location
      user.save((error, saveduser) => {
        if (error) {
          return  res.status(422).send(error);
        }
        else {
          return res.json({ image_url: saveduser.photo });
        }
      });
    }
  });
})

let verificationUpload = multer({ dest: 'uploads/' })
import fs from 'fs';
//Stripe Implementation
const keySecret = process.env.SECRET_KEY;
const keyPublishable = process.env.PUBLISHABLE_KEY;
const stripe = require("stripe")(keySecret);

app.post('/api/verification_file', verificationUpload.single('verification_file'), function (req, res, next) {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return  res.status(422).send(err);
    }
    else {
      stripe.fileUploads.create(
        {
          purpose: 'identity_document',
          file: {
            data: fs.readFileSync(req.file.path),
            name: req.file.originalname,
            type: 'application/octet-stream'
          }
        },
        function(err, file) {
          if(err) {
            return res.status(422).send(err);
          } else {
            user.stripe_file_id = file.id
            user.save((err, saved) => {
              if(err) {
                return res.status(422).send(err);
              } else {
                return res.status(200).send({status: true});
              }
            })
          }
        }
      );
    }
  });
})

app.post('/api/bg_profile_image', bg_img_upload.single('file_upload'), function (req, res, next) {
  console.log(req)
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return  res.status(422).send(err);
    } else {
      console.log('req.file.location')
      console.log(req.file.location)
      user.bgphoto = req.file.location
      user.save((error, saveduser) => {
        if (error) {
          return  res.status(422).send(error);
        }
        else {
          return res.json({ bgimage_url: saveduser.bgphoto });
        }
      });
    }
  });
})

app.post('/api/product_image', productupload.single('image'), function (req, res, next){
  res.json({ image_url: req.file.location });
})

app.post('/api/update_product_image', productupload.single('image'), function (req, res, next){
  Product.findOne({ cuid: req.body.cuid }).exec((err, product) => {
    if (err) {
        return  res.status(422).send(err);
    }
    else{
      product.photo = req.file.location
      product.save((error, savedproduct) => {
        if (error) {
          return res.status(422).send(error);
        }
        else {
          return res.json({ image_url: savedproduct.photo });
        }
      });
    }
  });
})

// Admin Logout
app.get('/admin/logouts', logout());

// app.get('/', ExpressStrompath.loginRequired, function(req, res) {
//   res.send('Welcome back: ' + res.locals.user.email);
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

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

export default app;
