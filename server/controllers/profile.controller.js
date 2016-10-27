import User from '../models/user';
import cuid from 'cuid';
import Express from 'express';
import ExpressStrompath from 'express-stormpath';
import bodyParser from 'body-parser';
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

