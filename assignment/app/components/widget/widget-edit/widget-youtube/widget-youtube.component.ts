import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
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

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute) { }

  deleteYoutube() {
    if( this.widgetId) {
      this.widgetService.deleteWidget(this.widgetId);
    }
  }

  updateYoutube() {
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
        new Widget(iD, "YOUTUBE", this.pageId, "", "", "", "");
      this.widget = this.widgetService.createWidget(this.pageId, new_widget);
      this.widgetId = this.widget._id;
    }
  }

}
