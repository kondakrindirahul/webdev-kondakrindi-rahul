var mongoose = require('mongoose');
var widgetSchema = require('../widgets/widget.schema.server');
var pageSchema = mongoose.Schema({
  name: String,
  websiteId: {type: mongoose.Schema.Types.ObjectId,
    ref: 'WebsiteModel'},
  title: String,
  description: String,
  widgets: [widgetSchema],
  dateCreated: Date
}, {collection: 'page'});

module.exports = pageSchema;
