import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AccountHistory } from '../Account-History';
import { AccountHistoryService } from 'src/services/account-history.service';
import { Chart } from '@syncfusion/ej2-charts';

@Component({
  selector: 'app-account-history-graph',
  templateUrl: './account-history-graph.component.html',
  styleUrls: ['./account-history-graph.component.css']
})

export class AccountHistoryGraphComponent implements OnInit, OnChanges {

  @Input() accountId = 12345

  ngOnChanges(changes: SimpleChanges) {
    this.accountId = changes["accountId"].currentValue;
    console.log(this.accountId);
    this.getAccountHistoryByIdParams = {accountId: this.accountId}
  }

  constructor(private accountHistoryService: AccountHistoryService) {}

  ngOnInit(): void {
  }

  //Parameters
  getAccountHistoryByIdParams = {accountId: this.accountId}
  
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


