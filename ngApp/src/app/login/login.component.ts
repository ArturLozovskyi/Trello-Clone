import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = { };
  loginError = false;
  constructor(private loginService: LoginService, private router: Router) { }

  user = this.loginService.user;

  ngOnInit() {
  }

  loginUser() {
    this.loginService.loginUser(this.loginUserData)
      .subscribe(
        res => { this.user.isLogin = true; localStorage.setItem('token', res.token); this.router.navigateByUrl('/home'); },
        err => this.loginError = true
      );
  }
  loginErrorClose() {
    this.loginError = false;
  }
}
