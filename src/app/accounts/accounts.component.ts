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
    this.getAccountsByUser();
  }

  //Parameters
  getAccountByIdParams = {accountId: 0}
  getAccountsByUserParams = {userId: 1001}
  
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

  getAccountById(accId: number): void{
    this.getAccountByIdParams = {accountId: accId};
    this.accountService.getById(this.getAccountByIdParams)
      .subscribe( (data: Account | undefined)=>{
        if (data !== undefined) {
          this.reportAccount = data;
        }
      } )
  }


}
