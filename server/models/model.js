// // for local
// var connectionString = 'mongodb://127.0.0.1:27017/test';
//
// // check if running remotely
// if(process.env.MLAB_USERNAME_WEBDEV) {
//   var username = process.env.MLAB_USERNAME_WEBDEV;
//   var password = process.env.MLAB_PASSWORD_WEBDEV;
//   connectionString = 'mongodb://' + username + ':' + password;
//   connectionString += '@ds135444.mlab.com:35444/heroku_jwzh22cj'
// }
//
// // model.js is responsible for connecting to the database
// var mongoose = require('mongoose');
// var db = mongoose.connect(connectionString, { useMongoClient: true});
// module.exports = db;



// code for running in local//
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/cs5610', { useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports = db;
