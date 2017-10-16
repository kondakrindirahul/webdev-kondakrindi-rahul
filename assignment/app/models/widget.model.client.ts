export class Widget {
  name: string;
  _id: string;
  widgetType: string;
  pageId: string;
  size: string;
  text: string;
  width: string;
  url: string;

  constructor(_id, widgetType, pageId, size, text, width, url) {
    this._id = _id;
    this.widgetType = widgetType;
    this.pageId = pageId;
    this.size = size;
    this.text = text;
    this.width = width;
    this.url = url;
  }
}
