import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  deleteHeader() {
    if (this.widgetId) {
      this.widgetService
        .deleteWidget(this.userId, this.websiteId, this.pageId, this.widgetId)
        .subscribe((widget) => {
          this.router.navigate(['/user/', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    }
  }

  updateHeader() {
    if (this.widgetId) {
      this.widgetService.updateWidget(this.userId, this.websiteId, this.pageId, this.widget)
        .subscribe((widget) => {
          this.router.navigate(['/user/', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    }
    else{
      this.widgetService.createWidget(this.userId, this.websiteId, this.pageId, this.widget)
        .subscribe((widget) => {
          this.widget = widget;
          this.router.navigate(['/user/', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    }
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.widgetId = params['wgid'];
          this.userId = params['userId'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
        });

    if (this.widgetId) {
      this.widgetService
        .findWidgetById(this.userId, this.websiteId, this.pageId, this.widgetId)
        .subscribe((widget) => {
          this.widget = widget;
        });
    }
    else {
      this.widget = {_id: "", widgetType: "", pageId: "", size: "", text: "", width: "", url: ""};
      this.widget.widgetType = "HEADING";
    }
  }

}