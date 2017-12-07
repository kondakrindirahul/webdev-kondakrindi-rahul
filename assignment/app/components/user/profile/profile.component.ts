import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../services/user.service.client";
import { User } from "../../../models/user.model.client";
import { SharedServiceClient } from "../../../services/shared.service.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string;
  user = {};
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  // users: User[];

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sharedService: SharedServiceClient) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];
    this.username = this.user['username'];
    this.firstName = this.user['firstName'];
    this.lastName = this.user['lastName'];
    this.password = this.user['password'];

    // this.activatedRoute.params
    //   .subscribe(params => {
    //     this.user = this.sharedService.user || {};
    //   });
  }

  logout() {
    this.userService.logout()
      .subscribe((status: any) => {
        this.router.navigate(['/login']);
      });
  }


  updateProfile() {

    this.sharedService.user['firstName'] = this.firstName;
    this.sharedService.user['lastName'] = this.lastName;
    this.sharedService.user['username'] = this.username;

    this.userService
      .updateUser(this.sharedService.user['_id'], this.sharedService.user)
      .subscribe((users) => {});

    // const updatedUser = this.user;
    // this.userService.updateUser(this.userId, updatedUser)
    //   .subscribe((users) => {
    //     this.users = users;
    //   });
  }

}
