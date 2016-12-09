import passport from 'passport';
import mongoose from 'mongoose';
import Admin from '../../models/admin';


export function addAdmin(req, res) {
  const newadmin = new Admin();
  newadmin.full_name = req.body.full_name;
  newadmin.email = req.body.email;
  newadmin.setPassword(req.body.password);
  newadmin.save(function(err) {
    if(err){
      return res.status(500).send(err);
    }
    else{
      var token;
      token = newadmin.generateJwt();
      return res.json({"token" : token});
    }
  });
}



export function adminLogin(req, res) {
   passport.authenticate('local', function(err, admin, info){
    console.log(admin)
    var token;
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a admin is found
    if(admin){
      token = admin.generateJwt();
       return res.json({"token" : token});
    } else {
      // If admin is not found
      return res.status(401).json(info);
    }
  })(req, res);
}


// export  function adminLogout (req, res) {
//   logout()
//     res.send(bye)
//   // if (res.status == 200){
//   // }
// }
