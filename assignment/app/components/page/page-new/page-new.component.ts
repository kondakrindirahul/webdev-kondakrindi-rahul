import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { PageService } from "../../../services/page.service.client";
import { Page } from "../../../models/page.model.client";

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  @ViewChild('f') pagenewForm: NgForm;

  userId: string;
  websiteId: string;
  pages: Page[];

  //properties
  name: string;
  title: string;
  errorFlag: boolean;

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.websiteId = params['wid'];
          this.userId = params['userId'];
          this.pageService
            .findPageByWebsiteId(this.userId, this.websiteId)
            .subscribe((pages) => {
              this.pages = pages;
            });
        }
      );
  }


  pagenew() {
    if(this.name) {
      const page: Page = new Page('', this.name, this.websiteId, this.title);
      this.pageService.createPage(this.userId, this.websiteId, page)
        .subscribe((pages) => {
          this.pages = pages;
          this.router.navigate(['user', this.userId, 'website', this.websiteId, 'page']);
        });
    } else {
      this.errorFlag = true;
    }
  }

}
