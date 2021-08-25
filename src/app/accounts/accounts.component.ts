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

  //Parameters
  getAccountByIdParams = {accountId: null}
  getAccountsByUserParams = {userId: null}
  
  //Reported from service
  reportAccount: Account = {
    accountId: 0,
    userId: 0,
    name: "",
    accountType: "",
    value: 0
  }
  reportAccountList: Account[] = []

  getAccountsByUser(): void{
    this.accountService.getByUser(this.getAccountsByUserParams)
      .subscribe( (data: Account[])=>{
        if (data.length !== 0) {
          this.reportAccountList = data;
        }
      } )
  }

  getAccountById(): void{
    this.accountService.getById(this.getAccountByIdParams)
      .subscribe( (data: Account | undefined)=>{
        if (data !== undefined) {
          this.reportAccount = data;
        }
      } )
  }


}
