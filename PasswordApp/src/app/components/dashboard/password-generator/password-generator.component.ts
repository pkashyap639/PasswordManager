import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../../../services/password.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.css'
})
export class PasswordGeneratorComponent implements OnInit{

  public newPassword:string = ""
  constructor(private password:PasswordService, private clipboard:Clipboard){}
  ngOnInit(): void {
    
  }

  copyPasswordToClipboard(){
    this.clipboard.copy(this.newPassword)
  }
  generateRandonPassword(){
    this.password.generatePassword().subscribe({
      next:(res)=>{
        console.log(res.password);
        this.newPassword = res.password
        
      },
      error:(err)=>{
        console.error(err);
        
      }
    })
  }
}
