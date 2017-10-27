module.exports = function (app) {

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
    var user_id = (new Date()).getTime() + "";
    var user = req.body;
    user._id = user_id;
    users.push(user);
    res.json(user);
  }

  function findUsers(req, res) {
    var username = req.query["username"];
    var password =  req.query["password"];

    if(username && password) {
      var user = users.find(function (user) {
        return user.username === username && user.password === password;
      });
      if(user) {
        res.json(user);
      }
      else {
        res.json({});
      }

      return;
    }

    else if(username) {
      var user = users.find(function (user) {
        return user.username === username;
      });
      if(user) {
        res.json(user);
      }
      else {
        res.json({});
      }

      return;
    }
    res.json(users);
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];
    var user = users.find(function (user) {
      return user._id === userId;
    });
    res.json(user);
  }

  function updateUser(req, res) {
    var userId = req.params['userId'];
    var newUser = req.body;
    for(var i=0; i<users.length; i++) {
      if(users[i]._id === userId) {
        users[i] = newUser;
        res.json(newUser);
        return;
      }
    }
  }

};
