import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AccountHistory } from '../Account-History';
import { AccountHistoryService } from 'src/services/account-history.service';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.css']
})

export class AccountHistoryComponent implements OnInit, OnChanges {

  @Input() accountId = 0

  ngOnChanges(changes: SimpleChanges) {
    this.accountId = changes["accountId"].currentValue;
    console.log(this.accountId);
    this.getAccountHistoryByIdParams = {accountId: this.accountId}
  }

  constructor(private accountHistoryService: AccountHistoryService) { }

  ngOnInit(): void {
  }

  //Parameters
  getAccountHistoryByIdParams = {accountId: 0}
  
  //Reported from service
  reportAccountHistoryList: AccountHistory[] = []

  getAccountHistoryById(): void{
    this.accountHistoryService.getByAccountId(this.getAccountHistoryByIdParams)
      .subscribe( (data: AccountHistory[])=>{
        if (data.length > 0) {
          this.reportAccountHistoryList = data;
        }
      } )
  }

}
