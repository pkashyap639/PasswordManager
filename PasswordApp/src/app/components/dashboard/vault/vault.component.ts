import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { PasswordService } from '../../../services/password.service';
import { GetPassword } from '../../../models/GetPassword';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrl: './vault.component.css'
})
export class VaultComponent implements OnInit{

  constructor(private auth:AuthService, private password:PasswordService, ){}
  public passwordData:GetPassword[] = []
  

  ngOnInit(): void {
    this.getAllPassword()
  }

  getAllPassword(){
    this.password.getPasswords(this.auth.getUserId()).subscribe({
      next:(res)=>{
        this.passwordData = res;
        console.log(this.passwordData);
        
        
      },
      error:(err)=>{
        console.log(err);
        
      },
      complete:()=>{

      }
    })
  }
}
