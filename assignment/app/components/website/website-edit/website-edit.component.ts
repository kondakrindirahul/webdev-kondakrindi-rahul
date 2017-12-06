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
  errorFlag: Boolean;

  constructor(private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.websiteId = params['wid'];

          this.websiteService
            .findWebsitesByUser(this.userId)
            .subscribe((websites) => {
              this.websites = websites;
            });

          this.websiteService
            .findWebsiteById(this.userId, this.websiteId)
            .subscribe((website) => {
              this.website = website;
            });
        }
      );

  }

  updateWebsite(websiteId) {
    this.websiteService.findWebsiteById(this.userId, websiteId)
      .subscribe((website) => {
      this.website = website;
      });

    if(this.website.name) {
      const updatedWebsite = this.website;
      this.websiteService.updateWebsite(this.userId, updatedWebsite)
        .subscribe((websites) => {
          this.websites = websites;
          this.router.navigate(['user', this.userId, 'website']);
        });
    } else {
      this.errorFlag = true;
    }
  }

  deleteWebsite(websiteId) {
    this.websiteService.deleteWebsite(this.userId, websiteId)
      .subscribe((websites) => {
        this.websites = websites;
        this.router.navigate(['user', this.userId, 'website']);
      });
  }


}
