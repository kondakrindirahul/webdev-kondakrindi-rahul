module.exports = function (app) {

  var PAGES = [
    { _id: "321", name: "Post 1", websiteId: "456", title: "Lorem" },
    { _id: "432", name: "Post 2", websiteId: "456", title: "Lorem" },
    { _id: "543", name: "Post 3", websiteId: "456", title: "Lorem" }
  ];

  app.get("/api/user/:userId/website/:wid/page", findPageByWebsiteId);
  app.post("/api/user/:userId/website/:wid/page", createPage);
  app.delete("/api/user/:userId/website/:wid/page/:pid", deletePage);
  app.get("/api/user/:userId/website/:wid/page/:pid", findPageById);
  app.put("/api/user/:userId/website/:wid/page/:pid", updatePage);

  function createPage(req, res) {
    var page_id = (new Date()).getTime() + "";
    var userId = req.params['userId'];
    var websiteId = req.params['wid'];
    var page = req.body;
    page._id = page_id;
    page.websiteId = websiteId;
    PAGES.push(page);
    var pages = getPages(websiteId);
    res.json(pages);
  }

  function findPageById(req, res) {
    var userId = req.params['userId'];
    var websiteId = req.params['wid'];
    var pageId = req.params['pid'];

    res.json(getSinglePage(pageId));
  }

  function findPageByWebsiteId(req, res) {
    var userId = req.params['userId'];
    var websiteId = req.params['wid'];
    var pageId = req.params['pid'];

    var pages = getPages(websiteId);
    res.json(pages);
  }

  function findWebsitesByUser(req, res) {
    var userId = req.params['userId'];
    var websites = getWebsites(userId);
    res.json(websites);
  }

  //utility function
  function getPages(websiteId) {
    var pages = [];
    for(var i=0; i<PAGES.length; i++) {
      if(PAGES[i].websiteId === websiteId) {
        pages.push(PAGES[i]);
      }
    }
    return pages;
  }

  //utility function
  function getSinglePage(pageId) {
    for(var i=0; i<PAGES.length; i++) {
      if(PAGES[i]._id === pageId) {
        return PAGES[i];
      }
    }
  }

  function updatePage(req, res) {
    var userId = req.params['userId'];
    var websiteId = req.params['wid'];
    var pageId = req.params['pid'];
    var newPage = req.body;
    for(var i=0; i<PAGES.length; i++) {
      if(PAGES[i]._id === pageId) {
        PAGES[i] = newPage;
        var pages = getPages(websiteId);
        res.json(pages);
      }
    }
  }

  function deletePage(req, res) {
    // var userId = req.params['userId'];
    var websiteId = req.params['wid'];
    var pageId = req.params['pid'];
    for(var i=0; i<PAGES.length; i++) {
      if(PAGES[i]._id === pageId) {
        PAGES.splice(i, 1);
        var pages = getPages(websiteId);
        res.json(pages);
        return;
      }
    }
  }

};
