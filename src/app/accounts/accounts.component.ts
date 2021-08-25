import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/account.service';
import { Account } from '../Account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  accountName: String = ""
  paramObj = {accountId: 12345}
  reportData: Account = {
    accountId: 0,
    userId: 0,
    name: "",
    accountType: "",
    value: 0
    }

  makeServiceCall(){
    console.log(this.paramObj)
    this.accountService.getApiData(this.paramObj)
      .subscribe( (data: Account | undefined)=>{
        console.log(data)
        if (data !== undefined) {
          this.reportData = data;
        }
      } )
  }

}
