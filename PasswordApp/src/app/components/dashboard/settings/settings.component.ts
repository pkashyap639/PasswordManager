import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../../../services/password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { createUser } from '../../../models/createUser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{

  updateProfileForm!: FormGroup;

  ngOnInit(): void {
    this.createUpdatePasswordForm()
    this.getCurrentUser()
  }
  constructor(
    private password: PasswordService,
    private fb: FormBuilder,
    private auth: AuthService,
    private activeRoute: ActivatedRoute,
    private router:Router
  ) {}

  createUpdatePasswordForm(){
    this.updateProfileForm = this.fb.group({
      UserName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      UserEmail: ['',[Validators.required, Validators.maxLength(200),Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.email]],
      Password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
      });
  }

  updateProfile(){
    if(this.updateProfileForm.valid){
      const userData:createUser = {
        UserName: this.updateProfileForm.value.UserName,
        UserEmail: this.updateProfileForm.value.UserEmail,
        Password: this.updateProfileForm.value.Password
      }
    
    this.auth.updateProfile(this.auth.getUserId(),userData).subscribe({
      next:(res)=>{
        console.log(res);
        
      },
      error:(err)=>{
        console.error(err);
        
      },
      complete:()=>{
        this.router.navigate(['dashboard'])
      }
    })
    }
  }

  getCurrentUser(){
    this.auth.getUserProfile(this.auth.getUserId()).subscribe({
      next:(res)=>{
        console.log(res);
        
        this.updateProfileForm.patchValue({
          UserName: res.userName,
          UserEmail: res.userEmail,
        })
      },
      error:(err)=>{
        console.error(err);
        
      }
    })
  }
  checkFormValidity(){
    if(this.updateProfileForm.invalid){
      return true
    }
    return false
  }

  // getters for controlnames
  get UserName(){
    return this.updateProfileForm.get('UserName')
  }
  get UserEmail(){
    return this.updateProfileForm.get('UserEmail')
  }
  get Password(){
    return this.updateProfileForm.get('Password')
  }
}
