import { Component, OnInit } from '@angular/core';
import { PageService } from "../../../services/page.service.client";
import { Page } from "../../../models/page.model.client";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  userId: string;
  websiteId: string;
  pages: Page[];

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.websiteId = params['wid'];
          this.userId = params['userId'];
        }
      );
    this.pages = this.pageService.findPageByWebsiteId(this.websiteId);
  }

}
