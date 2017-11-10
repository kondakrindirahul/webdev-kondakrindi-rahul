module.exports = function (app) {

  var PAGES = [
    { _id: "321", name: "Post 1", websiteId: "456", title: "Lorem" },
    { _id: "432", name: "Post 2", websiteId: "456", title: "Lorem" },
    { _id: "543", name: "Post 3", websiteId: "456", title: "Lorem" }
  ];

  var pageModel = require('../models/page/page.model.server');

  app.get("/api/user/:userId/website/:wid/page", findPageByWebsiteId);
  app.post("/api/user/:userId/website/:wid/page", createPage);
  app.delete("/api/user/:userId/website/:wid/page/:pid", deletePage);
  app.get("/api/user/:userId/website/:wid/page/:pid", findPageById);
  app.put("/api/user/:userId/website/:wid/page/:pid", updatePage);

  function createPage(req, res) {
    var websiteId = req.params['wid'];
    var page = req.body;
    page.websiteId = websiteId;
    delete page._id;

    pageModel.createPage(page)
      .then(function (page) {
        pageModel.findPageByWebsiteId(websiteId)
          .then(function (pages) {
            res.json(pages);
          });
      }, function (err) {
        console.log(err);
      });
  }

  function findPageById(req, res) {
    var pageId = req.params['pid'];

    pageModel.findPageById(pageId)
      .then(function (page) {
        res.json(page)
      });
  }

  function findPageByWebsiteId(req, res) {
    var websiteId = req.params['wid'];

    pageModel.findPageByWebsiteId(websiteId)
      .then(function (pages) {
        res.json(pages);
      });
  }

  function updatePage(req, res) {
    var pageId = req.params['pid'];
    var newPage = req.body;

    pageModel.updatePage(pageId, newPage)
      .then(function (pages) {
        res.json(pages);
      });
  }

  function deletePage(req, res) {
    var pageId = req.params['pid'];

    pageModel.deletePage(pageId)
      .then(function (pages) {
        res.json(pages);
      });
  }

};
