import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUser } from '../models/createUser';
import { Observable } from 'rxjs';
import { loginUser } from '../models/loginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiUrl:string = 'https://localhost:7250/api/Auth/'

  createUser(user:createUser):Observable<any>{
    return this.http.post(this.apiUrl,user);
  }

  loginUser(user:loginUser):Observable<any>{
    return this.http.post(`${this.apiUrl}signin/`,user)
  }
}
