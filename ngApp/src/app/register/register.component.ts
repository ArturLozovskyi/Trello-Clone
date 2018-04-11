import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../shared/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = { } ;
  registerError = false;

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
  }

  registerUser(){
    this.registerService.registerUser(this.registerUserData)
      .subscribe(
        res => { localStorage.setItem('token', res.token); this.router.navigateByUrl('/login') },
        err =>this.registerError = true
    );
  }

  registerErrorClose(){
    this.registerError = false;
  }

}
