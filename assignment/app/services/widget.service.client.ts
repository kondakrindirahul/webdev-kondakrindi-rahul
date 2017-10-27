import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Widget } from "../models/widget.model.client";

@Injectable()
export class WidgetService {

  api = {
    'createWidget'   : this.createWidget,
    'findWidgetsByPageId' : this.findWidgetsByPageId,
    'findWidgetById' : this.findWidgetById,
    'updateWidget' : this.updateWidget,
    'deleteWidget' : this.deleteWidget
  };

  constructor(private http: Http) {}

  findAllWidgets() {
    return this.http.get("http://localhost:3100/api/widget")
      .map((response: Response) => {
      return response.json();
      });
  }

  createWidget(userId, websiteId, pageId, widget) {
    const url = 'http://localhost:3100/api/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget';
    return this.http.post(url, widget)
      .map((response: Response) => {
        return response.json();
      });
  }


  findWidgetsByPageId(userId, websiteId, pageId) {
    const url = 'http://localhost:3100/api/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget';
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });

  }


  findWidgetById(userId, websiteId, pageId, widgetId) {
    const url = 'http://localhost:3100/api/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateWidget(userId, websiteId, pageId, updatedwidget) {

    const url = 'http://localhost:3100/api/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + updatedwidget._id;
    return this.http.put(url, updatedwidget)
      .map((response: Response) => {
        return response.json();
      });

    // for (let x = 0; x < this.widgets.length; x++) {
    //   const _widget = this.widgets[x];
    //   if (_widget._id === widgetId) {
    //
    //     if (_widget.widgetType == "HEADING") {
    //       _widget.text = widget.text;
    //       _widget.size = widget.size;
    //     }
    //
    //     else if (_widget.widgetType === "IMAGE") {
    //       _widget.text = widget.text;
    //       _widget.url = widget.url;
    //       _widget.width = widget.width;
    //     }
    //
    //     else if (_widget.widgetType === "HEADING") {
    //       _widget.url = widget.url;
    //       _widget.width = widget.width;
    //     }
    //     this.widgets[x] = _widget;
    //     break;
    //   }
    // }
  }

  deleteWidget(userId, websiteId, pageId, widgetId) {
    const url = 'http://localhost:3100/api/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }

}
