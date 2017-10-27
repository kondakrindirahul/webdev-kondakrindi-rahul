import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import { Website } from "../models/website.model.client";

@Injectable()
export class WebsiteService {
  websites: Website[] = [
    new Website("123", "Facebook", "456", "Lorem"),
    new Website("234", "Tweeter", "456", "Lorem"),
    new Website("456", "Gizmodo", "456", "Lorem"),
    new Website("890", "Go", "123", "Lorem"),
    new Website("567", "Tic Tac Toe", "123", "Lorem"),
    new Website("678", "Checkers", "123", "Lorem"),
    new Website("789", "Chess", "234", "Lorem")
  ];

  api = {
    'createWebsite'   : this.createWebsite,
    'findWebsitesByUser' : this.findWebsitesByUser,
    'findWebsiteById' : this.findWebsiteById,
    'updateWebsite' : this.updateWebsite,
    'deleteWebsite' : this.deleteWebsite
  };

  constructor(private http: Http) {}

  domain_url = environment.baseUrl;

  createWebsite(userId, website) {

    const url = this.domain_url + '/api/user/' + userId + '/website';
    return this.http.post(url, website)
      .map((response: Response) => {
        return response.json();
      });
  }

  findWebsitesByUser(userId) {
    const url = this.domain_url + '/api/user/' + userId + '/website';
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findWebsiteById(userId, websiteId) {

    const url = this.domain_url + '/api/user/' + userId + '/website/' + websiteId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateWebsite(userId, updatedwebsite) {
    const url = this.domain_url + '/api/user/' + userId + '/website/' + updatedwebsite._id;
    return this.http.put(url, updatedwebsite)
      .map((response: Response) => {
        return response.json();
      });

  }

  deleteWebsite(userId, websiteId) {

    const url = this.domain_url + '/api/user/' + userId + '/website/' + websiteId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }

}
