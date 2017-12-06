import { User } from "../models/user.model.client";
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { SharedServiceClient } from "./shared.service.client";

@Injectable()
export class UserService {

  users: User[];

  constructor(private http: Http,
              private sharedService: SharedServiceClient,
              private router: Router) {}

  options: RequestOptions = new RequestOptions();

  domain_url = environment.baseUrl;

  api = {
    'register'  : this.register,
    'login'  : this.login,
    'logout' : this.logout,
    'loggedIn' : this.loggedIn,
    'createUser'   : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByCredentials' : this.findUserByCredentials,
    'findUserByUsername' : this.findUserByUsername,
    'updateUser' : this.updateUser,
    'deleteUser' : this.deleteUser
  };

  register(username, password) {
    const url = this.domain_url + '/api/register';
    const credentials = {
      username: username,
      password: password
    };
    this.options.withCredentials = true;
    return this.http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  login(username, password) {
    const url = this.domain_url + '/api/login';
    const credentials = {
      username: username,
      password: password
    };
    this.options.withCredentials = true;
    return this.http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  logout() {
    const url = this.domain_url + '/api/logout';
    this.options.withCredentials = true;
    return this.http.post(url, this.options)
    .map((status) => {
      return status;
    });
  }

  loggedIn() {
    const url = this.domain_url + '/api/loggedIn';
    this.options.withCredentials = true;
    return this.http.post(url, '', this.options)
      .map((res: Response) => {
        const user = res.json();
        if (user !== 0) {
          this.sharedService.user = user;
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }

  isAdmin() {
    const url = this.domain_url + '/api/admin/isAdmin';
    this.options.withCredentials = true;
    return this.http.get(url, this.options)
      .map((res: Response) => {
        const user = res.json();
        if (user !== 0) {
          this.sharedService.user = user; return true;
        } else {
          this.router.navigate(['/login']); return false;
        }
      });
  }

  createUser(user) {
    const url = this.domain_url + '/api/user';
    return this.http.post(url, user)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserByCredentials(username, password) {
    const url = this.domain_url + '/api/user?username=' + username + '&password=' + password;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
    });
  }

  findUserById(userId) {
    const url = this.domain_url + '/api/user/' + userId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });

  }

  findAllUsers() {
    const url = this.domain_url + '/api/admin/user';
    this.options.withCredentials = true;
    return this.http.get(url, this.options)
      .map((res: Response) => {
        return res.json();
      });
  }


  findUserByUsername(username) {
    const url = this.domain_url + '/api/user?username=' + username;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateUser(userId, updateduser) {
    const url = this.domain_url + '/api/user/' + userId;
    return this.http.put(url, updateduser)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteUser(userId) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        this.users.splice(x, 1);
      }
    }
  }


}
