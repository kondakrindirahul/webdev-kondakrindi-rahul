module.exports = function (app) {
  var multer = require('multer');
  var upload = multer({dest:__dirname+'/../../assignment/assets/uploads'});

  app.post('/api/user/:userId/website/:wid/page/:pid/widget', createWidget);
  app.get('/api/user/:userId/website/:wid/page/:pid/widget', findWidgetsByPageId);
  app.delete('/api/user/:userId/website/:wid/page/:pid/widget/:wgid', deleteWidget);
  app.get('/api/user/:userId/website/:wid/page/:pid/widget/:wgid', findWidgetById);
  app.get('/api/widget', findAllWidgets);
  app.put('/api/user/:userId/website/:wid/page/:pid/widget/:wgid', updateWidget);

  app.post('/api/upload', upload.single('myFile'), uploadImage);
  // app.get('/api/upload', getFileUploads);

  var WIDGETS = [
    {_id: "123", widgetType: "HEADING", pageId: "321", size: "2", text: "Gizmodo", width: "", url: ""},
    {_id: "234", widgetType: "HEADING", pageId: "321", size: "4", text: "Lorem Ipsum", width: "", url: ""},
    {_id: "345", widgetType: "IMAGE", pageId: "321", size: "", text: "", width: "100%", url: "http://lorempixel.com/400/200/"},
    // {_id: "456", widgetType: "HTML", pageId: "321", size: "", text: "<p>Lorem ipsum</p>", width: "", url: ""},
    {_id: "567", widgetType: "HEADING", pageId: "321", size: "4", text: "Lorem Ipsum", width: "", url: ""},
    {_id: "678", widgetType: "YOUTUBE", pageId: "321", size: "", text: "", width: "100%", url: "https://www.youtube.com/embed/AM2Ivdi9c4E"},
    // {_id: "789", widgetType: "HTML", pageId: "321", size: "", text: "<p>Lorem ipsum</p>", width: "", url: ""}
  ];

  var widgetModel = require('../models/widgets/widget.model.server');

  function createWidget(req, res) {
    var pageId = req.params['pid'];
    var widget = req.body;
    widget.pageId = pageId;
    delete widget._id;

    widgetModel.createWidget(widget)
      .then(function (widget) {
        res.json(widget);
    });
  }

  function findAllWidgets(req, res) {
    res.json(WIDGETS);
  }

  function  findWidgetsByPageId(req, res) {
    var pageId = req.params['pid'];

    widgetModel.findWidgetsByPageId(pageId)
      .then(function (widgets) {
        res.json(widgets);
      });
  }

  function findWidgetById(req, res) {
    var widgetId = req.params['wgid'];

    widgetModel.findWidgetById(widgetId)
      .then(function (widget) {
        res.json(widget);
      });
  }

  function deleteWidget(req, res) {
    var widgetId = req.params['wgid'];

    widgetModel.deleteWidget(widgetId)
      .then(function (widgets) {
        res.json(widgets);
      });
  }

  function updateWidget(req, res) {
    var widgetId = req.params['wgid'];
    var updatedWidget = req.body;

    widgetModel.updateWidget(widgetId, updatedWidget)
      .then(function (widgets) {
        res.json(widgets);
      });
  }

  function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname;
    var filename = myFile.filename;
    var path = myFile.path;
    var destination = myFile.destination;
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    widget = widgetModel.findWidgetById(widgetId);
    widget.url = '/assets/uploads/' + filename;
    widgetModel
      .updateWidget(widgetId, widget)
      .then(function () {
        res.json(null);
      });

    var callbackUrl = req.headers.origin + "/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
    res.redirect(callbackUrl);
  }

  // function getFileUploads(req, res) {
  //   fs.readdir(__dirname+'/../../assignment/uploads',
  //     function (err, files) {
  //       res.send(files);
  //     });
  // }

};






















