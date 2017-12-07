module.exports = function (app) {

  var bcrypt = require("bcrypt-nodejs");

  var userModel = require("../models/user/user.model.server");

  var passport = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;
  var LocalStrategy = require('passport-local').Strategy;

  // var facebookConfig = {
  //   clientID     : '902573586572999',
  //   clientSecret : '0d8db32f95dac1ed9dbb042246038ed4',
  //   callbackURL  : 'http://localhost:3100/api/facebook/oauth2callback'
  // };

  var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
  };
  passport.use(
    new FacebookStrategy(facebookConfig, facebookStrategy));

  passport.use(new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.post('/api/register', register);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/loggedIn', loggedIn);
  app.get('/api/admin/isAdmin', isAdmin);
  app.get('/api/admin/user', checkIsAdmin, findAllUsers);

  app.post("/api/user", createUser);
  app.get("/api/user", findUsers);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);

  app.get ('/facebook/login',
    passport.authenticate('facebook', { scope : 'email' }));

  app.get ('/facebook/oauth2callback',
    passport.authenticate('facebook', {
      successRedirect: '/user',
      failureRedirect: '/login'
    }));

  function facebookStrategy(token, refreshToken, profile, done)
  {
    userModel.findUserByFacebookId(profile.id)
      .then(function(user) {
        if(user) { return done(null, user); } // already in db
        else { // if not, insert into db using profile info
          var names = profile.displayName.split(" ");
          var newFacebookUser = { lastName:  names[1],
            firstName: names[0],
            email:     profile.emails ? profile.emails[0].value:"",
            facebook: { id: profile.id, token: token }
          };
          return userModel.createUser(newFacebookUser);
        }
      })
      .then(
        function(user){
          return done(null, user);
        });
  }

  function login(req, res) {
      res.json(req.user);
  }

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  function loggedIn(req, res) {
    if(req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.send('0');
    }
  }

  function findAllUsers(req, res) {
    userModel
      .findAllUsers()
      .then(function (users) {
        res.json(users);
      });
  }

  function isAdmin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
      res.json(req.user);
    } else {
      res.send('0');
    }
  }

  function checkIsAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
      next();
    } else {
      res.send(401);
    }
  }


  function localStrategy(usr, pass, done) {
    userModel
      .findUserByUsername(usr)
      .then(function (user) {
        if(user && user.username === usr
          && bcrypt.compareSync(pass, user.password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });

  }

  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);

    // userModel.createUser(user)
    //   .then(function (user) {
    //     if(user) {
    //       res.status(401);
    //     } else {
    //       res.json(user);
    //     }
    //   });

    userModel
      .createUser(user)
      .then(function(user){
        req.login(user, function(err) {
          res.json(user);
        });
      });

  }

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

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }


};
