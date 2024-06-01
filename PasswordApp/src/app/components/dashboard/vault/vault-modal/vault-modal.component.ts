import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PasswordService } from '../../../../services/password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddPasswordEntry } from '../../../../models/AddPasswordEntry';
import { AuthService } from '../../../../services/auth.service';
import { GetPassword } from '../../../../models/GetPassword';

@Component({
  selector: 'app-vault-modal',
  templateUrl: './vault-modal.component.html',
  styleUrl: './vault-modal.component.css'
})
export class VaultModalComponent implements OnInit{

  constructor(private password:PasswordService,private fb:FormBuilder, private auth:AuthService){}
  addPasswordForm!:FormGroup;
  showModal = true
  public passwordDataFromModel:GetPassword[] = []

  ngOnInit(): void {
    this.createAddPasswordForm()
  }

  createAddPasswordForm(){
    this.addPasswordForm = this.fb.group({
      SiteName: ['',[Validators.required,Validators.maxLength(150)]],
      Username: ['',[Validators.required,Validators.maxLength(150)]],
      Password: ['',[Validators.required,Validators.maxLength(150)]],
      Url: ['',[Validators.required,Validators.maxLength(200)]],
      Notes: ['', Validators.maxLength(200)]
    })
  }

  get SiteName(){
    return this.addPasswordForm.get('SiteName')
  }
  get Username(){
    return this.addPasswordForm.get('Username')
  }
  get Password(){
    return this.addPasswordForm.get('Password')
  }
  get Url(){
    return this.addPasswordForm.get('Url')
  }
  get Notes(){
    return this.addPasswordForm.get('Notes')
  }
  SubmitPassword(){
    if(this.addPasswordForm.valid){
      console.log(this.addPasswordForm.value);
      const pwdData:AddPasswordEntry ={
        SiteName: this.addPasswordForm.value.SiteName,
        Username: this.addPasswordForm.value.Username,
        Password: this.addPasswordForm.value.Password,
        Url: this.addPasswordForm.value.Url,
        Notes: this.addPasswordForm.value.Notes,
        CreatedAt: new Date(),
        AppUserId: this.auth.getUserId()
      } 
      this.password.addPassword(pwdData).subscribe({
        next:(res)=>{
          console.log(res);
          this.passwordDataFromModel = res
          this.getAllPassword()
          this.showModal = false

        },
        error:(err)=>{
          console.log(err);
          
        },
        complete:()=>{
          this.addPasswordForm.reset();
        }
      })
      
    }
  }

  checkFormValidity(){
    if(this.addPasswordForm.invalid){
      return true
    }
    return false
  }

  getAllPassword(){
    this.password.getPasswords(this.auth.getUserId()).subscribe({
      next:(res)=>{
        //this.passwordDataFromModel = res;
        console.log(this.passwordDataFromModel);
        
      },
      error:(err)=>{
        console.log(err);
        
      },
      complete:()=>{

      }
    })
  }
}
