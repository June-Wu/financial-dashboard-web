import { Component, Input, OnInit } from '@angular/core';
import { AccountHistoryService } from 'src/services/account-history.service';
import { NetWorth } from '../Net-Worth';

@Component({
  selector: 'app-net-worth-graph',
  templateUrl: './net-worth-graph.component.html',
  styleUrls: ['./net-worth-graph.component.css']
})
export class NetWorthGraphComponent implements OnInit {

  constructor(private accountHistoryService: AccountHistoryService) {}

  @Input() userId = 1001;

  //Parameters
  getNetWorthByUserParams = {userId: this.userId}
  
  //Reported from service
  reportNetWorth: NetWorth[] = [];

  ngOnInit(): void {
    console.log(this.getNetWorthByUserParams);
    this.getNetWorthById();
  }

  getNetWorthById(): void{
    this.accountHistoryService.getNetWorthByUserId(this.getNetWorthByUserParams)
      .subscribe( (data: NetWorth[])=>{
        if (data.length > 0) {
          console.log(data);
          this.reportNetWorth = data;
        }
      } )
  }

}
