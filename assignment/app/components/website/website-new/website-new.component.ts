import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { WebsiteService } from "../../../services/website.service.client";
import { Website } from "../../../models/website.model.client";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  @ViewChild('f') websitenewForm: NgForm;

  //properties

  userId: string;
  websites: Website[];

  name: string;
  description: string;
  errorFlag: boolean;
  errorMsg: 'Invalid username or description ! ';

  constructor(private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  websitenew() {
    const website: Website = new Website('', this.name, this.userId, this.description);
    this.websiteService.createWebsite(this.userId, website)
      .subscribe((websites) => {
        // this.websites = websites;
        this.router.navigate(['user', this.userId, 'website']);
      });
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];

          this.websiteService
            .findWebsitesByUser(this.userId)
            .subscribe((websites) => {
              this.websites = websites;
            });
        }
      );
  }

}
