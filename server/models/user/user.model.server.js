var mongoose = require('mongoose');
var UserSchema = require("./user.schema.server");
var UserModel = mongoose.model("UserModel", UserSchema);
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserById = findUserById;
UserModel.createUser = createUser;
UserModel.updateUser = updateUser;
UserModel.findAllUsers = findAllUsers;
UserModel.findUserByFacebookId = findUserByFacebookId;

module.exports = UserModel;

function createUser(user) {
  user.roles = ['USER'];
  return UserModel.create(user);
}

function findUserByCredentials(username, password) {
  return UserModel.findOne({username: username, password: password});
}

function findUserByFacebookId(facebookId) {
  return UserModel.findOne({'facebook.id': facebookId});
}

function findUserByUsername(username) {
  return UserModel.findOne({username: username});
}

function findUserById(userId) {
  return UserModel.findById(userId);
}

function findAllUsers() {
  return UserModel.find();
}

function updateUser(userId, user) {
  return UserModel.update({_id: userId}, user);
}
