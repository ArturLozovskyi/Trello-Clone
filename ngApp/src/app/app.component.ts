import { Component } from '@angular/core';
import { LoginService } from './shared/login.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private loginService: LoginService) {
  }

  user = this.loginService.user;

  ngOnChanges(){
  }

 
}
