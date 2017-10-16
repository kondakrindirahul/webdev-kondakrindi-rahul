import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
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

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute) { }

  updatePage(){
    this.pageService.updatePage(this.pageId, this.page);
  }

  deletePage(){
    this.pageService.deletePage(this.pageId);
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.pageId = params['pid'];
        this.websiteId = params['wid'];
        this.userId = params['userId'];
      });

    this.page = this.pageService.findPageById(this.pageId);
    this.pages = this.pageService.findPageByWebsiteId(this.websiteId);
  }

}
