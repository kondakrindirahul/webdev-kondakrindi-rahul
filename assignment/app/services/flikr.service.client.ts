import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class FlickrService {
  key = '959c5671caf7ca3b1deec34bcf953bcc';
  secret = 'd35d4ae0a12d2551';
  urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';

  constructor(private _http: Http) {}

  searchPhotos(searchTerm: any) {
    const url = this.urlBase
      .replace('API_KEY', this.key)
      .replace('TEXT', searchTerm);
    return this._http.get(url);
  }
}
