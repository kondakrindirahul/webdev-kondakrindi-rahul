import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service.client";
import { User } from "../../../models/user.model.client";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  username: string;
  password: string;
  verify_password: string;
  user: User;
  errorFlag: boolean;
  errorFlag2: boolean
  errorMsg = 'Try registering with different username';
  errorMsg2 = 'The Passwords do not match';

  constructor(private userService: UserService,
              private router: Router) { }

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verify_password = this.registerForm.value.verify_password;

    if (this.password !== this.verify_password) {
      this.errorFlag2 = true;
      return;
    }

    this.userService.findUserByCredentials(this.username, this.password).
    subscribe((current_user: User) => {
      if (current_user._id == null) {
        const new_user: User = new User('', this.username, this.password, '', '');
        this.userService.createUser(new_user)
          .subscribe((user) => {
            // this.user = user;
            this.router.navigate(['/user/', user._id]);
          });
      }
      else {
        this.errorFlag = true;
      }
    });
  }

  ngOnInit() {
  }

}
