import { Component, Input, OnInit } from '@angular/core';
import { GetPassword } from '../../../../models/GetPassword';

@Component({
  selector: 'app-vault-table',
  templateUrl: './vault-table.component.html',
  styleUrl: './vault-table.component.css'
})
export class VaultTableComponent implements OnInit{
  @Input() public passwordTableData:any = []

  ngOnInit(): void {
    console.log(this.passwordTableData);
    
  }
}
