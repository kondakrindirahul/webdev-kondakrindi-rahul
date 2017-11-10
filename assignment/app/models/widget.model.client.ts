export class Widget {
  _id: string;
  widgetType: string;
  pageId: string;
  size: string;
  text: string;
  width: string;
  url: string;
  rows: Number;
  name: string;
  placeholder: string;
  formatted: Boolean;

  constructor(_id, widgetType, pageId, size, text, width, url, rows, name, placeholder, formatted) {
    this._id = _id;
    this.widgetType = widgetType;
    this.pageId = pageId;
    this.size = size;
    this.text = text;
    this.width = width;
    this.url = url;
    this.rows = rows;
    this.name = name;
    this.placeholder = placeholder;
    this.formatted = formatted;
  }
}
