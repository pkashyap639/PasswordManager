import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxValidator, Validators } from '@angular/forms';
import { loginUser } from '../../models/loginUser';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent implements OnInit{

  signInForm!:FormGroup;
  showLoadingSpinner:boolean = false
  showSuccessToast = false
  showErrorToast = false
  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router) {
    
  }

  ngOnInit(): void {
    this.createSignUpForm()
  }

  createSignUpForm(){
    this.signInForm = this.fb.group({
    UserEmail: ['',[Validators.required, Validators.maxLength(200),Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.email]],
    Password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  submitSignInForm(){
    this.showLoadingSpinner = true
    if(this.signInForm.valid){
      var user:loginUser = {
        UserEmail: this.signInForm.value.UserEmail,
        Password: this.signInForm.value.Password
      }
      this.auth.loginUser(user).subscribe({
        next:(res)=>{
          
        },
        error:(err)=>{
          console.error(err);
          this.showLoadingSpinner = false;
          this.showErrorToast = true;
          setTimeout(() => {
            this.showErrorToast = false;
          }, 3000);
        },
        complete:()=>{
          console.log("Completed");
          this.showLoadingSpinner = false;
          this.showSuccessToast = true;
          setTimeout(() => {
            this.showSuccessToast = false;
          }, 3000);
        }
      })
    }
    else{
      console.log("Invalid Form");
      
    }
    
  }

  checkFormValidity(){
    if(this.signInForm.invalid){
      return true
    }
    return false
  }

  get UserEmail(){
    return this.signInForm.get('UserEmail')
  }
  get Password(){
    return this.signInForm.get('Password')
  }

}
