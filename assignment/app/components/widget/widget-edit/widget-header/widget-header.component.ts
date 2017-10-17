import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { WidgetService } from "../../../../services/widget.service.client";
import { Widget } from "../../../../models/widget.model.client";

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  text: string;
  size: string;
  widget: Widget;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute) { }

  deleteHeader() {
    if(this.widgetId) {
      this.widgetService.deleteWidget(this.widgetId);
    }
  }

  updateHeader() {
      this.widgetService.updateWidget(this.widgetId, this.widget);
    }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.widgetId = params['wgid'];
          this.userId = params['userId'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
        }
      );
    if(this.widgetId){
      this.widget = this.widgetService.findWidgetById(this.widgetId);
    }
    else{
      const iD = Math.random().toString();
      const new_widget: Widget =
        new Widget(iD, "HEADING", this.pageId, "", "", "", "");
      this.widget = this.widgetService.createWidget(this.pageId, new_widget);
      this.widgetId = this.widget._id;
    }

  }

}
