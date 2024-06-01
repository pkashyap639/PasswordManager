import { Component, Input, OnInit } from '@angular/core';
import { GetPassword } from '../../../../models/GetPassword';
import { AuthService } from '../../../../services/auth.service';
import { PasswordService } from '../../../../services/password.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-vault-table',
  templateUrl: './vault-table.component.html',
  styleUrl: './vault-table.component.css'
})
export class VaultTableComponent implements OnInit{
  @Input() public passwordTableData:any = []
  public singlePassword?:GetPassword;
  constructor(private auth:AuthService, private password:PasswordService, private clipboard:Clipboard){}
  ngOnInit(): void {
    console.log(this.passwordTableData);
    
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


}
