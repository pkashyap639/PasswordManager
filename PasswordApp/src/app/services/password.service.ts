import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AddPasswordEntry } from '../models/AddPasswordEntry';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  apiUrl:string = 'https://localhost:7250/api/Password/'

  constructor(private auth:AuthService, private http:HttpClient) { }

  addPassword(password:AddPasswordEntry):Observable<any>{
    return this.http.post(this.apiUrl,password);
  }

  getPasswords(Id:string):Observable<any>{
    return this.http.get(`${this.apiUrl}Id?Id=${Id}`);
  }

  getSinglePassword(VaultId:string, UserId:string):Observable<any>{
    return this.http.get(`${this.apiUrl}VaultId/UserId?VaultId=${VaultId}&UserId=${UserId}`);
  }

  deletePassword(VaultId:string, UserId:string):Observable<any>{
    return this.http.delete(`${this.apiUrl}VaultId/UserId?VaultId=${VaultId}&UserId=${UserId}`);
  }
}
