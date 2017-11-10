import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { WidgetService } from "../../../../services/widget.service.client";
import { Widget } from "../../../../models/widget.model.client";
import { environment } from "../../../../../environments/environment";
import { Http, Response } from "@angular/http";

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  width: string;
  url: string;
  widget: Widget;
  files: String[] = [];
  baseUrl: string = environment.baseUrl;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: Http) { }

  deleteImage() {
    if(this.widgetId) {
      this.widgetService
        .deleteWidget(this.userId, this.websiteId, this.pageId, this.widgetId)
        .subscribe((widget) => {
          this.router.navigate(['/user/', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    }
  }

  updateImage() {
    if (this.widgetId) {
      this.widgetService.updateWidget(this.userId, this.websiteId, this.pageId, this.widget)
        .subscribe((widget) => {
          this.router.navigate(['/user/', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    }
    else {
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

    this.http.get(this.baseUrl + '/api/upload')
      .map((response: Response) => {
        return response.json();
      })
      .subscribe((files) => {
        this.files = files;
      });

    if (this.widgetId) {
      this.widgetService
        .findWidgetById(this.userId, this.websiteId, this.pageId, this.widgetId)
        .subscribe((widget) => {
          this.widget = widget;
        });
    }
    else {
      this.widget = {_id: "", widgetType: "", pageId: "", size: "", text: "", width: "", url: "", rows: null, name: "", placeholder: "", formatted: false};
      this.widget.widgetType = "IMAGE";
    }
  }
}


