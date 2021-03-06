import { Component, Input, OnInit } from '@angular/core';
import { AccountHistoryService } from 'src/services/account-history.service';
import { NetWorth } from 'src/models/Net-Worth';
import { FinancialService } from 'src/services/financial.service';

@Component({
  selector: 'app-net-worth-graph',
  templateUrl: './net-worth-graph.component.html',
  styleUrls: ['./net-worth-graph.component.css']
})
export class NetWorthGraphComponent implements OnInit {

  constructor(private accountHistoryService: AccountHistoryService, private financialService: FinancialService) {}

  @Input() userId = 1001;

  public primaryXAxis: Object;
  public chartData: Object[];
  public primaryYAxis: Object;
  public legendSettings: Object;
  public tooltip: Object;
  public marker: Object;

  //Parameters
  getNetWorthByUserParams = {userId: this.userId}
  
  //Reported from service
  reportNetWorth: NetWorth[] = [];

  ngOnInit(): void {
    this.getNetWorthById();
    this.tooltip = {
      enable: true
    }
    this.chartData = this.reportNetWorth.sort((a, b) => a.date.valueOf() - b.date.valueOf());
    this.primaryXAxis = {
      valueType: 'DateTimeCategory',
      labelFormat: 'dd/MM/yy',
      majorTickLines: { color: 'transparent', width: 0 },
    };
    this.primaryYAxis = {
        labelFormat: '${value}K'
    };
    this.legendSettings = {
        visible: true
    };
  }

  getNetWorthById(): void{
    this.accountHistoryService.getNetWorthByUserId(this.getNetWorthByUserParams)
      .subscribe( (data: NetWorth[])=>{
        if (data.length > 0) {
          this.reportNetWorth = data;
        }
      } );
  }

}
