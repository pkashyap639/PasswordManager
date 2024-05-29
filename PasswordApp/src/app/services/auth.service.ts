import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUser } from '../models/createUser';
import { Observable } from 'rxjs';
import { loginUser } from '../models/loginUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private jwt:JwtHelperService, private router:Router) { }
  apiUrl:string = 'https://localhost:7250/api/Auth/'

  createUser(user:createUser):Observable<any>{
    return this.http.post(this.apiUrl,user);
  }

  loginUser(user:loginUser):Observable<any>{
    return this.http.post(`${this.apiUrl}signin/`,user)
  }

  setSession(token:any){
    sessionStorage.setItem('token',token)
    sessionStorage.setItem('UserName',this.jwt.decodeToken(token)!.UserName)
    sessionStorage.setItem('UserEmail',this.jwt.decodeToken(token)!.UserEmail)
    sessionStorage.setItem('UserId',this.jwt.decodeToken(token)!.UserId)

  }

  signOut(){
    sessionStorage.clear()
    this.router.navigate(['signin'])
  }

  getUserId(){
    return sessionStorage.getItem("UserId")!;
  }

  checkAuth(){
    if(sessionStorage.getItem('token')){
      return true
    }
    return false
  }
}
