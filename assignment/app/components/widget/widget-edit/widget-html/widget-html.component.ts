import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { WidgetService } from "../../../../services/widget.service.client";
import { Widget } from "../../../../models/widget.model.client";

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  text: string;
  widget: Widget;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  deleteHtml() {
    if (this.widgetId) {
      this.widgetService
        .deleteWidget(this.userId, this.websiteId, this.pageId, this.widgetId)
        .subscribe((widget) => {
          this.router.navigate(['/user/', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    }
  }

  updateHtml() {
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
      this.widget = {_id: "", widgetType: "", pageId: "", size: "", text: "", width: "", url: "", rows: 0, name: "", placeholder: "", formatted: false};
      this.widget.widgetType = 'HTML';
    }
  }

}
