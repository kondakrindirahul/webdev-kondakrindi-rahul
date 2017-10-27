import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { UserService } from "../../../services/user.service.client";
import { User } from "../../../models/user.model.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string;
  user: User;
  users: User[];

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.userService.findUserById(this.userId)
        .subscribe((user: User) => {
        this.user = user;
        });
    });
  }

  updateProfile() {
    // this.userService.findUserById(this.userId)
    //   .subscribe((user) => {
    //     this.user = user;
    //   });
    const updatedUser = this.user;
    // this.firstname = updatedUser.firstName;
    // this.lastname = updatedUser.lastName;
    this.userService.updateUser(this.userId, updatedUser)
      .subscribe((users) => {
        this.users = users;
      });
  }
}
