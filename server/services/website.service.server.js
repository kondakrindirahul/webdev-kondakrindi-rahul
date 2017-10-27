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

  app.get("/api/user/:userId/website", findWebsitesByUser);
  app.post("/api/user/:userId/website", createWebsite);
  app.delete("/api/user/:userId/website/:wid", deleteWebsite);
  app.get("/api/user/:userId/website/:wid", findWebsiteById);
  app.put("/api/user/:userId/website/:wid", updateWebsite);

  function createWebsite(req, res) {
    var website_id = (new Date()).getTime() + "";
    var userId = req.params['userId'];
    var website = req.body;
    website._id = website_id;
    website.developerId = userId;
    WEBSITES.push(website);
    var websites = getWebsites(userId);
    res.json(websites);
  }

  function findWebsiteById(req, res) {
    var userId = req.params['userId'];
    var websiteId = req.params['wid'];

    res.json(getSingleWebsite(websiteId));
  }

  function findWebsitesByUser(req, res) {
    var userId = req.params['userId'];
    var websites = getWebsites(userId);
    res.json(websites);
  }

  // utility function
  function getWebsites(userId) {
    var websites = [];
    for(var i=0; i<WEBSITES.length; i++) {
      if(WEBSITES[i].developerId === userId) {
        websites.push(WEBSITES[i]);
      }
    }
    return websites;
  }

  //utility function
  function getSingleWebsite(websiteId) {
    for(var i=0; i<WEBSITES.length; i++) {
      if(WEBSITES[i]._id === websiteId) {
        return WEBSITES[i];
      }
    }
  }

  function updateWebsite(req, res) {
    var userId = req.params['userId'];
    var websiteId = req.params['wid'];
    var newWebsite = req.body;
    for(var i=0; i<WEBSITES.length; i++) {
      if(WEBSITES[i]._id === websiteId) {
        WEBSITES[i] = newWebsite;
        var websites = getWebsites(userId);
        res.json(websites);
        return;
      }
    }
  }

  function deleteWebsite(req, res) {
    var userId = req.params['userId'];
    var websiteId = req.params['wid'];
    for(var i=0; i<WEBSITES.length; i++) {
      if(WEBSITES[i]._id === websiteId) {
        WEBSITES.splice(i, 1);
        var websites = getWebsites(userId);
        res.json(websites);
        return;
      }
    }
  }

};
