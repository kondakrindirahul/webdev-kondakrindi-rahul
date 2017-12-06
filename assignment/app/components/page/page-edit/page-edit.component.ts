import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { PageService } from "../../../services/page.service.client";
import { Page } from "../../../models/page.model.client";

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  websiteId: string;
  userId: string;
  pages: Page[];

  //properties
  pageId: string;
  page: Page;
  errorFlag: Boolean;

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.pageId = params['pid'];
        this.websiteId = params['wid'];
        this.userId = params['userId'];

        this.pageService.findPageByWebsiteId(this.userId, this.websiteId)
          .subscribe((pages) => {
            this.pages = pages;
          });

        this.pageService.findPageById(this.userId, this.websiteId, this.pageId)
          .subscribe((page) => {
            this.page = page;
          });
      }
      );
  }

  updatePage(pageId){
    this.pageService.findPageById(this.userId, this.websiteId, pageId)
      .subscribe((page) => {
        this.page = page;
      });

    if(this.page.name) {
      const updatedPage = this.page;
      this.pageService.updatePage(this.userId, this.websiteId, updatedPage)
        .subscribe((pages) => {
          this.pages = pages;
          this.router.navigate(['user', this.userId, 'website', this.websiteId, 'page']);
        });
    } else {
      this.errorFlag = true;
    }
  }

  deletePage(pageId){
    this.pageService.deletePage(this.userId, this.websiteId, pageId)
      .subscribe((pages) => {
        this.pages = pages;
        this.router.navigate(['user', this.userId, 'website', this.websiteId, 'page']);
      });
  }

}
