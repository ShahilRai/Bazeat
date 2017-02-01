import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
var LocalStrategy = require('passport-local').Strategy;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const adminSchema = new Schema({
  full_name: { type: 'String' },
  email: { type: 'String' },
  hash:  { type: 'String' },
  salt:  { type: 'String' }},
  { timestamps: true }
);

adminSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

adminSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};


adminSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

export default mongoose.model('Admin', adminSchema);

