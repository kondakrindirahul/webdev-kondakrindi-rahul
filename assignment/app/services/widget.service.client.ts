import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Widget } from "../models/widget.model.client";


@Injectable()
export class WidgetService {

  widgets: Widget[] = [
    new Widget("123", "HEADING", "321", "2", "Gizmodo", "", ""),
    new Widget("234", "HEADING", "321", "4", "Lorem Ipsum", "", ""),
    new Widget("345", "IMAGE", "321", "", "", "100%", "http://lorempixel.com/400/200/"),
    new Widget("456", "HTML", "321", "", "<p>Lorem ipsum</p>", "", ""),
    new Widget("567", "HEADING", "321", "4", "Lorem Ipsum", "", ""),
    new Widget("678", "YOUTUBE", "321", "", "", "100%", "https://youtu.be/AM2Ivdi9c4E"),
    new Widget("789", "HTML", "321", "", "<p>Lorem ipsum</p>", "", "")
  ];

  api = {
    'createWidget'   : this.createWidget,
    'findWidgetsByPageId' : this.findWidgetsByPageId,
    'findWidgetById' : this.findWidgetById,
    'updateWidget' : this.updateWidget,
    'deleteWidget' : this.deleteWidget
  };

  createWidget(pageId, widget) {
    this.widgets.push(widget);
    return widget;
  }

  findWidgetsByPageId(pageId) {
    let widgets_array = [];
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x].pageId === pageId) {
        widgets_array.push(this.widgets[x]);
      }
    }
    return widgets_array;
  }

  findWidgetById(widgetId) {
    return this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });
  }

  updateWidget(widgetId, widget) {
    for (let x = 0; x < this.widgets.length; x++) {
      const _widget = this.widgets[x];
      if (_widget._id === widgetId) {

        if (_widget.widgetType == "HEADING") {
          _widget.text = widget.text;
          _widget.size = widget.size;
        }

        else if (_widget.widgetType === "IMAGE") {
          _widget.text = widget.text;
          _widget.url = widget.url;
          _widget.width = widget.width;
        }

        else if (_widget.widgetType === "HEADING") {
          _widget.url = widget.url;
          _widget.width = widget.width;
        }
        this.widgets[x] = _widget;
        break;
      }
    }
  }

  deleteWidget(widgetId) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id === widgetId) {
        this.widgets.splice(x, 1);
      }
    }
  }

}
