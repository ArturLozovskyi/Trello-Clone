import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CardsComponent } from './cards/cards.component';
import { TasksComponent } from './tasks/tasks.component';
import { TrelloService } from './shared/trello.service';
import { RegisterService } from './shared/register.service';
import { LoginService } from './shared/login.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CardsComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TrelloService, RegisterService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
