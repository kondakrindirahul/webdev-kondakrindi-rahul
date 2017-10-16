import { Component, OnInit } from '@angular/core';
import { WidgetService } from "../../../services/widget.service.client";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  // properties
  userId: string;
  websiteId: string;
  pageId: string;

  widgets = [{}];

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.pageId = params['pid'];
          this.userId = params['userId'];
          this.websiteId = params['wid'];
        }
      );
    this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
  }

}
