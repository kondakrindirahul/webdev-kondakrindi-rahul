import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
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
  errorMsg: 'Invalid username or password ! ';

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
    this.pages =
      this.pageService.findPageByWebsiteId(this.websiteId);
  }


  pagenew() {
    if (this.name) {
      let random_id = Math.random().toString();
      const newpage: Page = new Page(random_id, this.name, this.websiteId, this.title);
      this.pageService.createPage(this.websiteId, newpage);
    }
  }

}
