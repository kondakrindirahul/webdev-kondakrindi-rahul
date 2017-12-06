import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service.client";
import { User } from "../../../models/user.model.client";
import { NgForm } from "@angular/forms";
import { SharedServiceClient } from "../../../services/shared.service.client";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: String;
  password: String;
  verify_password: String;
  errorFlag: boolean;
  // errorMsg: 'The passwords do not match';

  constructor(private userService: UserService,
              private router: Router,
              private sharedService: SharedServiceClient) { }

  register() {

    if(this.password !== this.verify_password) {
      this.errorFlag = true;
      return;
    }

    this.userService.register(this.username, this.password)
      .subscribe((user) => {
        this.sharedService.user = user;
        this.router.navigate(['user', user._id]);
      });

  }

  ngOnInit() {
  }

}
