module.exports = function (app) {

  var WEBSITES = [
    {_id: "123", name: "Facebook", developerId: "456", description: "Lorem"},
    {_id: "234", name: "Tweeter", developerId: "456", description: "Lorem"},
    {_id: "456", name: "Gizmodo", developerId: "456", description: "Lorem"},
    {_id: "890", name: "Go", developerId: "123", description: "Lorem"},
    {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem"},
    {_id: "678", name: "Checkers", developerId: "123", description: "Lorem"},
    {_id: "789", name: "Chess", developerId: "234", description: "Lorem"}
  ];

  var websiteModel = require('../models/website/website.model.server');

  app.get("/api/user/:userId/website", findWebsitesByUser);
  app.post("/api/user/:userId/website", createWebsite);
  app.delete("/api/user/:userId/website/:wid", deleteWebsite);
  app.get("/api/user/:userId/website/:wid", findWebsiteById);
  app.put("/api/user/:userId/website/:wid", updateWebsite);

  function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;
    website.developerId = userId;
    delete website._id;

    websiteModel.createWebsite(website)
      .then(function (website) {
        websiteModel.findWebsitesByUser(userId)
          .then(function(websites) {
            res.json(websites);
          });
      }, function(err) {
        console.log(err);
      });
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params['wid'];

    websiteModel.findWebsiteById(websiteId)
      .then(function(website) {
        res.json(website);
      });
  }

  function findWebsitesByUser(req, res) {
    var userId = req.params['userId'];
    websiteModel.findWebsitesByUser(userId)
      .then(function(websites) {
        res.json(websites);
      });
  }

  function updateWebsite(req, res) {
    var websiteId = req.params['wid'];
    var newWebsite = req.body;

    websiteModel.updateWebsite(websiteId, newWebsite)
      .then(function (websites) {
        res.json(websites);
      });
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params['wid'];

    websiteModel.deleteWebsite(websiteId)
      .then(function (websites) {
        res.json(websites);
      });
  }

};
