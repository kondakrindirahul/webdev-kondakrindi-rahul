var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findPageByWebsiteId = findPageByWebsiteId;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(page) {
  return pageModel.create(page);
}

function findPageByWebsiteId(websiteId) {
  return pageModel
    .find({websiteId: websiteId})
    .populate('websiteId', 'name')
    .exec();
}

function findPageById(pageId) {
  return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
  return pageModel.update({_id: pageId}, page);
}

function deletePage(pageId) {
  return pageModel.deleteOne(pageId);
}
