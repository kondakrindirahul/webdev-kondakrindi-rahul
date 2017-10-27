module.exports = function (app) {

  app.post('/api/user/:userId/website/:wid/page/:pid/widget', createWidget);
  app.get('/api/user/:userId/website/:wid/page/:pid/widget', findWidgetsByPageId);
  app.delete('/api/user/:userId/website/:wid/page/:pid/widget/:wgid', deleteWidget);
  app.get('/api/user/:userId/website/:wid/page/:pid/widget/:wgid', findWidgetById);
  app.get('/api/widget', findAllWidgets);
  app.put('/api/user/:userId/website/:wid/page/:pid/widget/:wgid', updateWidget);

  var WIDGETS = [
    {_id: "123", widgetType: "HEADING", pageId: "321", size: "2", text: "Gizmodo", width: "", url: ""},
    {_id: "234", widgetType: "HEADING", pageId: "321", size: "4", text: "Lorem Ipsum", width: "", url: ""},
    {_id: "345", widgetType: "IMAGE", pageId: "321", size: "", text: "", width: "100%", url: "http://lorempixel.com/400/200/"},
    // {_id: "456", widgetType: "HTML", pageId: "321", size: "", text: "<p>Lorem ipsum</p>", width: "", url: ""},
    {_id: "567", widgetType: "HEADING", pageId: "321", size: "4", text: "Lorem Ipsum", width: "", url: ""},
    {_id: "678", widgetType: "YOUTUBE", pageId: "321", size: "", text: "", width: "100%", url: "https://www.youtube.com/embed/AM2Ivdi9c4E"},
    // {_id: "789", widgetType: "HTML", pageId: "321", size: "", text: "<p>Lorem ipsum</p>", width: "", url: ""}
  ];

  function createWidget(req, res) {
    var pageId = req.params['pid'];
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    WIDGETS.push(widget);
    res.json(widget);
  }

  function findAllWidgets(req, res) {
    res.json(WIDGETS);
  }

  function  findWidgetsByPageId(req, res) {
    var pageId = req.params['pid'];

    var widgets = getWidgets(pageId);
    res.json(widgets);
  }

  function findWidgetById(req, res) {
    var widgetId = req.params['wgid'];

    var widget = getSingleWidget(widgetId);
    res.json(widget);
  }

  //utility function
  function getSingleWidget(widgetId) {
    for(var i=0; i<WIDGETS.length; i++) {
      if(WIDGETS[i]._id === widgetId) {
        return WIDGETS[i];
      }
    }
  }

  //utility function
  function getWidgets(pageId) {
    var widgets = [];
    for(var i=0; i<WIDGETS.length; i++) {
      if(WIDGETS[i].pageId === pageId) {
        widgets.push(WIDGETS[i]);
      }
    }
    return widgets;
  }

  function deleteWidget(req, res) {
    var widgetId = req.params['wgid'];
    var pageId = req.params['pid'];

    for(var i=0; i<WIDGETS.length; i++) {
      if(WIDGETS[i]._id === widgetId) {
        WIDGETS.splice(i, 1);
        var widgets = getWidgets(pageId);
        res.json(widgets)
        return;
      }
    }
  }

  function updateWidget(req, res) {
    var pageId = req.params['pid'];
    var widgetId = req.params['wgid'];
    var updatedWidget = req.body;

    for(var i=0; i<WIDGETS.length; i++) {
      if(WIDGETS[i]._id === widgetId) {
        WIDGETS[i] = updatedWidget;
        var widgets = getWidgets(pageId);
        res.json(widgets);
      }
    }

  }

};






















