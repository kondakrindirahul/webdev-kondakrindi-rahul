import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Page } from "../models/page.model.client";

@Injectable()
export class PageService {
  pages: Page[] = [
    new Page("321", "Post 1", "456", "Lorem"),
    new Page("432", "Post 2", "456", "Lorem"),
    new Page("543", "Post 3", "456", "Lorem")
  ];

  api = {
    'createPage'   : this.createPage,
    'findPageByWebsiteId' : this.findPageByWebsiteId,
    'findPageById' : this.findPageById,
    'updatePage' : this.updatePage,
    'deletePage' : this.deletePage
  };

  createPage(websiteId, page) {
    page.websiteId = websiteId;
    this.pages.push(page);
  }

  findPageByWebsiteId(websiteId) {
    let page_array = [];
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x].websiteId === websiteId) {
        page_array.push(this.pages[x]);
      }
    }
    return page_array;
  }

  findPageById(pageId) {
    return this.pages.find(function (page) {
      return page._id === pageId;
    });
  }

  findPageByName(pageName) {
    return this.pages.find(function (page) {
      return page.name === pageName;
    });
  }


  updatePage(pageId, page) {
    for (let x = 0; x < this.pages.length; x++) {
      const _page = this.pages[x];
      if (_page._id === pageId) {
        this.pages[x].name = page.name;
        this.pages[x].title = page.title;
      }
    }
  }

  deletePage(pageId) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        this.pages.splice(x, 1);
      }
    }
  }

}
