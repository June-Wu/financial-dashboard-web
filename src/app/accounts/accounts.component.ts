import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/account.service';
import { Account } from 'src/models/Account'
import { FinancialService } from 'src/services/financial.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(private accountService: AccountService, private financialService: FinancialService) { }

  ngOnInit(): void {
    this.getAccountsByUser();
  }

  //Parameters
  getAccountByIdParams = { aid: 12345 }
  getAccountsByUserParams = { uid: 1001 }

  //Reported from service
  reportAccount: Account = {
    accountId: 0,
    userId: 0,
    name: "",
    accountType: "",
    value: 0
  }
  reportAccountList: Account[] = [];

  // for grouping
  investmentAccounts: Account[] = [];

  bankingAccounts: Account[] = [];

  getAccountsByUser(): void {
    this.financialService.getUserAccounts()
      .subscribe((response: any) => {
        this.reportAccountList = response.length > 0 ? response : this.reportAccountList;
        // for grouping
        for (let i = 0; i < this.reportAccountList.length; i++) {
          if (this.reportAccountList[i].accountType === "Investment") {
            this.investmentAccounts.push(this.reportAccountList[i]);
          } else {
            this.bankingAccounts.push(this.reportAccountList[i]);
          }
        }
      });
  }

  getAccountById(accId: number): void {
    this.getAccountByIdParams = { aid: accId };
    this.financialService.getUserAccountByAid(this.getAccountByIdParams)
      .subscribe((data: any) => {
        if (data !== undefined) {
          this.reportAccount = data;
          console.log(this.reportAccount);
        }
      });
  }


}
