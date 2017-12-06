var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  facebook: {
    id: String,
    token: String
  },
  firstName: String,
  lastName: String,
  roles: [{
    type: String,
    default: 'USER',
    enum: ['ADMIN', 'USER']}],
  dob: Date,
  salary: Number
}, {collection: 'user'});

module.exports =  UserSchema;
