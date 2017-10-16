import { Component, OnInit } from '@angular/core';
import { Website } from "../../../models/website.model.client";
import { WebsiteService } from "../../../services/website.service.client";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  userId: string;
  websites: Website[];

  websiteId: string;
  website: Website;
  // websitename: string;
  // description: string;

  constructor(private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.websiteId = params['wid'];
        }
      );

    this.websites =
      this.websiteService.findWebsitesByUser(this.userId);
    this.website =
      this.websiteService.findWebsiteById(this.websiteId);

  }

  updateWebsite(){
    this.websiteService.updateWebsite(this.websiteId,this.website);
  }

  deleteWebsite(){
    this.websiteService.deleteWebsite(this.websiteId);
  }


}
