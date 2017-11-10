var mongoose = require('mongoose');
var UserSchema = require("./user.schema.server");
var UserModel = mongoose.model("UserModel", UserSchema);
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserById = findUserById;
UserModel.createUser = createUser;
UserModel.updateUser = updateUser;

module.exports = UserModel;

function createUser(user) {
  return UserModel.create(user);
}

function findUserByCredentials(username, password) {
  return UserModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
  return UserModel.findOne({username: username});
}

function findUserById(userId) {
  return UserModel.findById(userId);
}

function updateUser(userId, user) {
  return UserModel.update({_id: userId}, user);
}
