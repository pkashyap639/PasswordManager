import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../../../../services/password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPasswordEntry } from '../../../../models/AddPasswordEntry';

@Component({
  selector: 'app-edit-vault',
  templateUrl: './edit-vault.component.html',
  styleUrls: ['./edit-vault.component.css']  // Corrected `styleUrl` to `styleUrls`
})
export class EditVaultComponent implements OnInit {

  addPasswordForm!: FormGroup;
  VaultId: string = "";
  UserId: string = "";
  showPassword: boolean = false;
  currentPasswordId?:string

  constructor(
    private password: PasswordService,
    private fb: FormBuilder,
    private auth: AuthService,
    private activeRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.VaultId = this.activeRoute.snapshot.params['vaultid'];
    this.UserId = this.activeRoute.snapshot.params['userid'];
    this.createAddPasswordForm();
    this.getSinglePassword(this.VaultId, this.UserId);
  }

  createAddPasswordForm() {
    this.addPasswordForm = this.fb.group({
      SiteName: ['', [Validators.required, Validators.maxLength(150)]],
      Username: ['', [Validators.required, Validators.maxLength(150)]],
      Password: ['', [Validators.required, Validators.maxLength(150)]],
      Url: ['', [Validators.required, Validators.maxLength(200)]],
      Notes: ['', Validators.maxLength(200)]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  UpdatePassword(){
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
      this.password.updatePassword(this.currentPasswordId!,pwdData.AppUserId!,pwdData).subscribe({
        next:(res)=>{
          console.log(res);
          this.addPasswordForm.reset();


        },
        error:(err)=>{
          console.log(err);
          
        },
        complete:()=>{
          this.router.navigate(['dashboard'])
        }
      })
      
    }
  }
  getSinglePassword(vaultId: string, userId: string) {
    this.password.getSinglePassword(vaultId, userId).subscribe({
      next: (res) => {
        console.log(res);
          this.currentPasswordId = res.passwordId
          this.addPasswordForm.patchValue({
            SiteName: res.siteName,
            Username: res.username,
            Password: res.password,
            Url: res.url,
            Notes: res.notes
          });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  get SiteName() {
    return this.addPasswordForm.get('SiteName');
  }
  get Username() {
    return this.addPasswordForm.get('Username');
  }
  get Password() {
    return this.addPasswordForm.get('Password');
  }
  get Url() {
    return this.addPasswordForm.get('Url');
  }
  get Notes() {
    return this.addPasswordForm.get('Notes');
  }

  checkFormValidity() {
    return this.addPasswordForm.invalid;
  }

}
