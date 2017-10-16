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

  api = {
    'createUser'   : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByCredentials' : this.findUserByCredentials,
    'findUserByUsername' : this.findUserByUsername,
    'updateUser' : this.updateUser,
    'deleteUser' : this.deleteUser
  };


  createUser(user: any) {
    //user._id = Math.random();
    this.users.push(user);
    return user;
  }

  findUserByCredentials(username, password) {
    return this.users.find(function (user) {
      return user.username === username && user.password === password;
    });
  }

  findUserById(userId) {
    return this.users.find(function (user) {
      return user._id === userId;
    });
  }

  findUserByUsername(username) {
    return this.users.find(function (user) {
      return user.username === username;
    });
  }

  updateUser(userId, user) {
    for (let x = 0; x < this.users.length; x++) {
      const _user = this.users[x];
      if (_user._id === userId) {
        this.users[x].firstName = user.firstName;
        this.users[x].lastName = user.lastName;
      }
    }
  }

  deleteUser(userId) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        this.users.splice(x, 1);
      }
    }
  }


}
