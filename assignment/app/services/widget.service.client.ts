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

  domain_url = environment.baseUrl;

  findAllWidgets() {
    return this.http.get(this.domain_url + '/api/widget')
      .map((response: Response) => {
      return response.json();
      });
  }

  createWidget(userId, websiteId, pageId, widget) {
    const url = this.domain_url + '/api/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget';
    return this.http.post(url, widget)
      .map((response: Response) => {
        return response.json();
      });
  }


  findWidgetsByPageId(userId, websiteId, pageId) {
    const url = this.domain_url + '/api/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget';
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });

  }


  findWidgetById(userId, websiteId, pageId, widgetId) {
    const url = this.domain_url + '/api/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateWidget(userId, websiteId, pageId, updatedwidget) {

    const url = this.domain_url + '/api/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + updatedwidget._id;
    return this.http.put(url, updatedwidget)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteWidget(userId, websiteId, pageId, widgetId) {
    const url = this.domain_url + '/api/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }

}
