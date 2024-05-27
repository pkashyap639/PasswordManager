import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent implements OnInit{

  signInForm!:FormGroup;
  constructor(private fb:FormBuilder) {
    
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
    if(this.signInForm.valid){
      console.log(this.signInForm.value);
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
