import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FlickrService } from "../../../../../services/flikr.service.client";
import { WidgetService } from "../../../../../services/widget.service.client";
import { Widget } from "../../../../../models/widget.model.client";

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  photos = [];
  searchText: string;
  widget: Widget;

  constructor(private flickrService: FlickrService,
              private activatedRoute: ActivatedRoute,
              private widgetService: WidgetService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.widgetId = params['wgid'];
        this.userId = params['userId'];
        this.websiteId = params['wid'];
        this.pageId = params['pid'];

        this.photos = [''];
        this.widgetService
          .findWidgetById(this.userId, this.websiteId, this.pageId, this.widgetId)
          .subscribe((widget: Widget) => {
            this.widget = widget;
          });
      });
  }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          console.log(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';
    const widget = {
      websiteId : this.websiteId,
      pageId : this.pageId,
      url: url,
      widgetType: "IMAGE"
    };

    this.widgetService
      .createWidget(this.userId, this.websiteId, this.pageId, widget)
      .subscribe((wd: any) => {
        this.router.navigate(['/user/', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget', wd._id]);
    });
  }
}
