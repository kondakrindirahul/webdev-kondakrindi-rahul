import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../../models/user.model.client";
import { UserService } from "../../../services/user.service.client";
import { SharedServiceClient } from "../../../services/shared.service.client";
import { environment } from "../../../../environments/environment";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  base_url: String = environment.baseUrl;
  errorFlag: Boolean;

  constructor(private userService: UserService,
              private router: Router,
              private sharedService: SharedServiceClient) { }

  ngOnInit() {
  }

  login() {

    this.userService
      .login(this.username, this.password)
      .subscribe((user) => {
        this.sharedService.user = user;
        this.router.navigate(['user']);
      });

  }

}
