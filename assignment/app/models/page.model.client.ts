export class Page {
  _id: string;
  name: string;
  websiteId: string;
  title: string;

  constructor(_id, name, websiteId, title) {
    this._id = _id;
    this.name = name;
    this.websiteId = websiteId;
    this.title = title;
  }
}
