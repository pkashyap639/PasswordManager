import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxValidator, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { createUser } from '../../models/createUser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent implements OnInit {

  public signUpForm!:FormGroup;
  public showLoadingSpinner:boolean = false
  public showSuccessToast = false
  public showErrorToast = false
  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router){}
  ngOnInit(): void {
    this.createSignUpForm()
  }

  createSignUpForm(){
    this.signUpForm = this.fb.group({
    UserName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    UserEmail: ['',[Validators.required, Validators.maxLength(200),Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.email]],
    Password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  submitSignUpForm(){
    if(this.signUpForm.valid){
      const userData:createUser = {
        UserName: this.signUpForm.value.UserEmail,
        UserEmail: this.signUpForm.value.UserEmail,
        Password: this.signUpForm.value.Password
      }
      this.auth.createUser(userData).subscribe({
        next:(res)=>{
          this.showLoadingSpinner = true
          console.log(res);
        },
        error:(err)=>{
          console.log(err);
          this.showLoadingSpinner = false
          this.showErrorToast = true
        },
        complete:()=>{
          console.log("Completed");
          this.showLoadingSpinner = false
          this.showSuccessToast = true
          setTimeout(() => {
            this.router.navigate(['signin'])
          }, 3000);
          
        }
      })
    }
    else{
      console.log("Invalid Form");
      
    }
    
  }

  checkFormValidity(){
    if(this.signUpForm.invalid){
      return true
    }
    return false
  }

  // getters for controlnames
  get UserName(){
    return this.signUpForm.get('UserName')
  }
  get UserEmail(){
    return this.signUpForm.get('UserEmail')
  }
  get Password(){
    return this.signUpForm.get('Password')
  }

}
