var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;

module.exports = websiteModel;

function createWebsite(website) {
  return websiteModel.create(website);
}

function findWebsitesByUser(userId) {
  return websiteModel
    .find({developerId: userId})
    .populate('developerId', 'username')
    .exec();
}

function findWebsiteById(websiteId) {
  return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
  return websiteModel.update({_id: websiteId}, website);
}

function deleteWebsite(websiteId) {
  return websiteModel.deleteOne(websiteId);
}
