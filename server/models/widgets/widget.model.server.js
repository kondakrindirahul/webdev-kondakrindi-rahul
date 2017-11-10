var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../../models/page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;

module.exports = widgetModel;

function createWidget(widget) {
  var new_widget = null;
  return widgetModel
    .create(widget)
    .then(function (widget) {
      new_widget = widget;
      return pageModel
        .findPageById(new_widget.pageId);
    })
    .then(function (page) {
      page.widgets.push(new_widget);
      return page.save();
    })
    .then(function(){
      return new_widget;
    })
}

function findWidgetsByPageId(pageId) {
  return widgetModel
    .find({pageId: pageId})
    .populate('pageId', 'name')
    .exec();
}

function findWidgetById(widgetId) {
  return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
  return widgetModel.update({_id: widgetId}, widget);
}

function deleteWidget(widgetId) {
  // return widgetModel.deleteOne(widgetId);
  return widgetModel.deleteOne({_id: {$in: widgetId}})
}




