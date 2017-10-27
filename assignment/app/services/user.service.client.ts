import { User } from "../models/user.model.client";
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  users: User[] = [
    new User('123', 'alice', 'alice', 'Alice', 'Wonder'),
    new User('234', 'bob', 'bob', 'Bob', 'Marley'),
    new User('345', 'charly', 'charly', 'Charly', 'Garcia'),
    new User('456', 'jannunzi', 'jannunzi', 'Jose', 'Annunzi')
  ];

  constructor(private http: Http) {}

  domain_url = environment.baseUrl;

  api = {
    'createUser'   : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByCredentials' : this.findUserByCredentials,
    'findUserByUsername' : this.findUserByUsername,
    'updateUser' : this.updateUser,
    'deleteUser' : this.deleteUser
  };


  createUser(user) {
    const url = this.domain_url + '/api/user/';
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
