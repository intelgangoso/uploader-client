import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  errMsg: String;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit() { }

  loginUser() {
    if (this.signinForm.value.email.length &&
      this.signinForm.value.password.length) {
    this.authService.signIn(this.signinForm.value)
    } else {
      this.errMsg = 'All fields are required';
      setTimeout(() => {
        this.errMsg = "";
      }, 3000);
    }
  }
}