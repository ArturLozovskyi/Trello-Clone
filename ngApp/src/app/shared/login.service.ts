import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;


@Injectable()
export class LoginService {
    private _loginUrl = "http://localhost:3000/api/login";

    constructor(private http: HttpClient){ }
    

    user = {
        isLogin: false
    };

    loginUser(user) {
        return this.http.post<any>(this._loginUrl, user);
    }
}