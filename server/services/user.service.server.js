module.exports = function (app) {

  var userModel = require("../models/user/user.model.server");

  app.post("/api/user", createUser);
  app.get("/api/user", findUsers);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);

  var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];

  function createUser(req, res) {
    var new_user = req.body;
    userModel.createUser(new_user)
      .then(function (user) {
        res.json(user);
      });
  }

  function findUsers(req, res) {
    var username = req.query["username"];
    var password =  req.query["password"];

    if(username && password) {
      var promise = userModel.findUserByCredentials(username, password);
      promise.then(function (user) {
        res.json(user);
        // console.log(result);
      });
      return;
    }

    else if(username) {
      userModel.findUserByUsername(username)
        .then(function(user) {
          res.json(user);
        });
      return;
    }
    res.json(users);
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];

    userModel.findUserById(userId)
      .then(function (user) {
        res.json(user);
    });
  }

  function updateUser(req, res) {
    var userId = req.params['userId'];
    var newUser = req.body;
    userModel.updateUser(userId, newUser).
      then(function (users) {
        res.json(users);
    });
  }

};
