import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUser } from '../models/createUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiUrl:string = 'https://localhost:7250/api/Auth/'
  
  createUser(user:createUser):Observable<any>{
    return this.http.post(this.apiUrl,user);
  }
}
