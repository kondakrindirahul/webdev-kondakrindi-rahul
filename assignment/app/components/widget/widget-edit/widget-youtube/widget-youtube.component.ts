import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { WidgetService } from "../../../../services/widget.service.client";
import { Widget } from "../../../../models/widget.model.client";

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  width: string;
  url: string;
  widget: Widget;
  errorFlag1: Boolean;
  errorFlag2: Boolean;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private route: Router) { }

  deleteYoutube() {
    if (this.widgetId) {
      this.widgetService.deleteWidget(this.userId, this.websiteId, this.pageId, this.widgetId)
        .subscribe((widget) => {
          this.route.navigate(['/user/', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    }
  }

  updateYoutube() {
    if (this.widgetId) {
      if(this.widget.url && this.widget.width) {
        this.widgetService
          .updateWidget(this.userId, this.websiteId, this.pageId, this.widget)
          .subscribe((widget) => {
            this.route.navigate(['/user/', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
          });
      } else {
        this.errorFlag1 = true;
      }
    }
    else {
      if(this.widget.url && this.widget.width) {
        this.widgetService.createWidget(this.userId, this.websiteId, this.pageId, this.widget)
          .subscribe((widget) => {
            this.widget = widget;
            this.route.navigate(['/user/', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
          });
      } else {
        this.errorFlag2 = true;
      }
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

    if (this.widgetId){
      this.widgetService
        .findWidgetById(this.userId, this.websiteId, this.pageId, this.widgetId)
        .subscribe((widget) => {
          this.widget = widget;
          // this.width = this.widget.width;
          // this.url = this.widget.url;
        });
    }
    else {
      this.widget = {_id: "", widgetType: "", pageId: "", size: "", text: "", width: "", url: "", rows: null, name: "", placeholder: "", formatted: false};
      this.widget.widgetType = "YOUTUBE";
    }
  }

}
