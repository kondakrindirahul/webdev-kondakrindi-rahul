import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { WidgetService } from "../../../../services/widget.service.client";

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
