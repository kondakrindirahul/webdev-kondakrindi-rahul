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

  constructor(private http: Http) {}

  domain_url = environment.baseUrl;

  api = {
    'createPage'   : this.createPage,
    'findPageByWebsiteId' : this.findPageByWebsiteId,
    'findPageById' : this.findPageById,
    'updatePage' : this.updatePage,
    'deletePage' : this.deletePage
  };

  createPage(userId, websiteId, page) {
    const url = this.domain_url + '/api/user/' + userId + '/website/' + websiteId + '/page';
    return this.http.post(url, page)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPageByWebsiteId(userId, websiteId) {
    const url = this.domain_url + '/api/user/' + userId + '/website/' + websiteId + '/page';
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPageById(userId, websiteId, pageId) {
    const url = this.domain_url + '/api/user/' + userId + '/website/' + websiteId + '/page/' + pageId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updatePage(userId, websiteId, updatedpage) {
    const url = this.domain_url + '/api/user/' + userId + '/website/' + websiteId + '/page/' + updatedpage._id;
    return this.http.put(url, updatedpage)
      .map((response: Response) => {
        return response.json();
      });

  }

  deletePage(userId, websiteId, pageId) {
    const url = this.domain_url + '/api/user/' + userId + '/website/' + websiteId + '/page/' + pageId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }

}
