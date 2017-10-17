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
  errorFlag: boolean;
  errorMsg = 'Try registering with different username';

  constructor(private userService: UserService,
              private router: Router) { }

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verify_password = this.registerForm.value.verify_password;

    const current_user = this.userService.findUserByCredentials(this.username, this.password);
    if(current_user == null) {
      let random_id = Math.random().toString();
      const new_user: User = new User(random_id, this.username, this.password, this.username, '');
      this.userService.createUser(new_user);
      this.router.navigate(['/user/', new_user._id]);
    }

    else {
      this.errorFlag = true;
    }
  }

  ngOnInit() {
  }

}
