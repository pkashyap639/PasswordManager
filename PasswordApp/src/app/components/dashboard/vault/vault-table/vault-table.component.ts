import { Component, Input, OnInit } from '@angular/core';
import { GetPassword } from '../../../../models/GetPassword';
import { AuthService } from '../../../../services/auth.service';
import { PasswordService } from '../../../../services/password.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vault-table',
  templateUrl: './vault-table.component.html',
  styleUrl: './vault-table.component.css'
})
export class VaultTableComponent implements OnInit{
  @Input() public passwordTableData:any = []
  public singlePassword?:GetPassword;
  constructor(private auth:AuthService, private password:PasswordService, private clipboard:Clipboard, private router:Router){}
  ngOnInit(): void {
    console.log(this.passwordTableData);
    
  }

  getAllPasswords(){
    this.password.getPasswords(this.auth.getUserId()).subscribe({
      next:(res)=>{
        this.passwordTableData = res
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  copyUserPass(VaultId:string, UserId:string){
    this.password.getSinglePassword(VaultId,UserId).subscribe({
      next:(res:any)=>{
        
        const UserPass:any = {
          username: res.username,
          password: res.password
        }
        this.clipboard.copy(`Username: ${UserPass.username} Password: ${UserPass.password}`)
        console.log(UserPass);
        
      },
      error:(err)=>{
        console.error(err);
        
      },
      complete:()=>{

      }
    })
    
  }

  copyOnlyUsername(VaultId:string, UserId:string){
    this.password.getSinglePassword(VaultId,UserId).subscribe({
      next:(res:any)=>{
        this.clipboard.copy(res.username )        
      },
      error:(err)=>{
        console.error(err);
      },
      complete:()=>{

      }
    })
  }

  copyOnlyPassword(VaultId:string, UserId:string){
    this.password.getSinglePassword(VaultId,UserId).subscribe({
      next:(res:any)=>{
        this.clipboard.copy(res.password )        
      },
      error:(err)=>{
        console.error(err);
      },
      complete:()=>{

      }
    })
  }

  launch(VaultId:string, UserId:string){
    this.password.getSinglePassword(VaultId,UserId).subscribe({
      next:(res:any)=>{
        window.open(res.url,'_blank')    
      },
      error:(err)=>{
        console.error(err);
      },
      complete:()=>{

      }
    })
  }

  deletePassword(VaultId:string, UserId:string){
    this.password.deletePassword(VaultId,UserId).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllPasswords()
      },
      error:(err)=>{
        console.error(err);
      },
      complete:()=>{

      }
    })
  }

}
