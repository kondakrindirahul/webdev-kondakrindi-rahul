import { Component, OnInit } from '@angular/core';
import { WidgetService } from "../../../services/widget.service.client";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  widgetId: string;
  pageId: string;
  websiteId: string;
  userId: string;
  // widgets = [{}];
  // widget = {_id: '', widgetType: '',
  //   pageId: '', size: 0, text: '',
  //   width: '', url: ''};
  widget = {};

  constructor(private activatedRoute: ActivatedRoute,
              private widgetService: WidgetService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.pageId = params['pid'];
          this.userId = params['userId'];
          this.websiteId = params['wid'];
          this.widgetId = params['wgid'];
        }
      );

    this.widget =
      this.widgetService.findWidgetById(this.widgetId);

    // this.widgets =
    //   this.widgetService.findWidgetsByPageId(this.pageId)
  }

}
