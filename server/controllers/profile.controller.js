import User from '../models/user';
import cuid from 'cuid';
import Express from 'express';
import ExpressStrompath from 'express-stormpath';
import bodyParser from 'body-parser';
import Knox from 'knox';
import AWS from 'aws-sdk';
const app = new Express();

export function addProfile(req, res) {
  const newUser = new User(req.body);
  newUser.cuid = cuid();
  console.log(req.body.producerinfo);
  console.log(req.body.userinfo);
  // newOrder.orderitems.create( req.body.orderitems );
  newUser.save((err, saved) => {
    if (err) {
      // res.json(500, { err: err });
      res.status(500).send(err);
    }
    saved.producerInfo.push(req.body.producerinfo);
    saved.userInfo.push(req.body.userinfo);
    res.json({ user: saved });
  });
}

export function getProfile(req, res) {
  console.log(req.query.email);
  User.findOne({ email: req.query.email }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user });
  });
}


// export function updateProfile(req, res) {
//   let client = Knox.createClient({key: process.env.AWSKey, secret: process.env.AWSSecret, bucket: process.env.AWSBucket});
//   console.log('req.file')
//   // console.log(req)
//   var file = req.body
//   // console.log(file)
//   var string = JSON.stringify(file);
//   var req = client.put(string, {
//       'Content-Length': Buffer.byteLength(string)
//     , 'Content-Type': 'application/json'
//   });
//   console.log('abc');
//   req.on('response', function(res){
//   console.log(res);
//     if (200 == res.statusCode) {
//       console.log('saved to %s', req.url);
//     }
//   });
//   req.end(string)
// }

export function updateProfile(req, res) {
  var s3 = require('s3');
  var awsS3Client = new AWS.S3({
    accessKeyId: process.env.AWSKey,
    secretAccessKey: process.env.AWSSecret,
    Bucket: process.env.AWSBucket,
    region: "us-west-1"
  });
  var options = {
    s3Client: awsS3Client,
  };
  var client = s3.createClient(options);
  console.log(client);
  var params = {
    localFile: req.body
  };
console.log('params');
console.log(params);
console.log('client.uploadFile');
console.log(client);
var uploader = client.uploadFile(params);
console.log('uploader');
console.log(uploader);
uploader.on('error', function(err) {
  console.error("unable to upload:", err.stack);
});
uploader.on('progress', function() {
  console.log("progress");
});
uploader.on('end', function() {
  console.log("done uploading");
});
}

// export function updateProfile(req, res) {
//   console.log("teedf;dmf"),
//   app.post('/profile', bodyParser.json(), ExpressStrompath.loginRequired, function (req, res) {
//     console.log("Good vgood")
//     function writeError(message) {
//       res.status(400);
//       res.json({ message: message, status: 400 });
//       res.end();
//     }

//     function saveAccount() {
//       console.log("Good")
//       req.user.givenName = req.body.givenName;
//       req.user.surname = req.body.surname;
//       req.user.email = req.body.email;

//       req.user.save(function (err) {
//         if (err) {
//           return writeError(err.userMessage || err.message);
//         }
//         // res.end();
//         User.findOne({ email: req.params.email }).exec((err, user) => {
//           user.photo = req.body.photo;
//           user.description = req.body.description;
//           user.city = req.body.city;
//           user.save((error, saveduser) => {
//             if (error) {
//               res.status(500).send(error);
//             }
//             saveduser.producerInfo.push(req.body.ifProducer);
//             saveduser.userInfo.push(req.body.ifUser);
//             saveduser.save(function (err, post) {
//               res.json({ user: saveduser });
//             });
//           });
//         });
//       });
//     }

//     if (req.body.password) {
//       var application = req.app.get('ExpressStrompath');

//       application.authenticateAccount({
//         username: req.user.username,
//         password: req.body.existingPassword
//       }, function (err) {
//         if (err) {
//           return writeError('The existing password that you entered was incorrect.');
//         }

//         req.user.password = req.body.password;

//         saveAccount();
//       });
//     } else {
//       saveAccount();
//     }
//   });
// }

