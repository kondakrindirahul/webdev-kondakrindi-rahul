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

    widgetModel.findWidgetById(widgetId)
      .then(function (widget) {
        widget.url = '/assets/uploads' + filename;
        widgetModel.updateWidget(widgetId, widget)
          .then(function (status) {
            var callbackUrl = '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;
            res.redirect(callbackUrl);
          });
      });
  }

};






















