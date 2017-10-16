import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { WidgetService } from "../../../../services/widget.service.client";
import { Widget } from "../../../../models/widget.model.client";

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  // @ViewChild('f') widgetheadingForm: NgForm;



  // userId: string;
  // websiteId: string;
  // pageId: string;
  // widgetId: string;
  // text: string;
  // size: string;
  // //
  // widget: Widget;



  constructor() { }

  // createheader() {
  //   this.widget.text = this.widgetheadingForm.value.name;
  //   this.widget.size = this.widgetheadingForm.value.size;
  //
  // }
  //
  // deleteHeader() {
  //   if( this.widgetId) {
  //     this.widgetService.deleteWidget(this.widgetId);
  //   }
  // }

  ngOnInit() {
    // this.activatedRoute.params
    //   .subscribe(
    //     (params: any) => {
    //       this.widgetId = params['wgid'];
    //       this.userId = params['userId'];
    //       this.websiteId = params['wid'];
    //       this.pageId = params['pid'];
    //     }
    //   );
    // if(this.widgetId){
    //   this.widget = this.widgetService.findWidgetById(this.widgetId);
    //   this.text = this.widget.text;
    //   this.size = this.widget.size;
    // }



  }

}
