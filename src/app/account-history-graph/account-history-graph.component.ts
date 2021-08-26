import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AccountHistory } from '../Account-History';
import { AccountHistoryService } from 'src/services/account-history.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from "ng-apexcharts";

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

  // just trying it out
  public series: ApexAxisChartSeries = [
    {
      name: "XYZ MOTORS",
      data: this.reportAccountHistoryList.map(a=>a.date.getTime()/1000)
    }
  ];
  public chart: ApexChart = {
    type: "area",
    stacked: false,
    height: 350,
    zoom: {
      type: "x",
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: "zoom"
    }
  };
  public dataLabels: ApexDataLabels = {
    enabled: false
  };
  public markers: ApexMarkers = {
    size: 0
  };
  public title: ApexTitleSubtitle = {
    text: "Stock Price Movement",
    align: "left"
  };
  public fill: ApexFill = {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
  };
  public yaxis: ApexYAxis = {
    labels: {
      formatter: function(val) {
        return (val / 1000000).toFixed(0);
      }
    },
    title: {
      text: "Price"
    }
  };
  public xaxis: ApexXAxis = {
    type: "datetime"
  };
  public tooltip: ApexTooltip = {
    shared: false,
    y: {
      formatter: function(val) {
        return (val / 1000000).toFixed(0);
      }
    }
  };

  public initChartData(): void {
    let ts2 = 1484418600000;
    this.getAccountHistoryById();
  }
}


