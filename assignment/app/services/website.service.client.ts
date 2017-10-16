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
    'findWebsiteByName' : this.findWebsiteByName,
    'updateWebsite' : this.updateWebsite,
    'deleteWebsite' : this.deleteWebsite
  };

  createWebsite(userId, website) {
    website.developerId = userId;
    this.websites.push(website);
  }

  findWebsitesByUser(userId) {
    const website_array = [];
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x].developerId === userId) {
        website_array.push(this.websites[x]);
      }
    }
    return website_array;
  }

  findWebsiteById(websiteId) {
    return this.websites.find(function (website) {
      return website._id === websiteId;
    });
  }

  findWebsiteByName(websiteName) {
    return this.websites.find(function (website) {
      return website.name === websiteName;
    })
  }

  updateWebsite(websiteId, website) {
    for (let x = 0; x < this.websites.length; x++) {
      const _website = this.websites[x];
      if (_website._id === websiteId) {
        this.websites[x].name = website.name;
        this.websites[x].description = website.description;
      }
    }
  }

  deleteWebsite(websiteId) {
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === websiteId) {
        this.websites.splice(x, 1);
      }
    }
  }

}
