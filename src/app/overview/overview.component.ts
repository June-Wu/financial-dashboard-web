import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/models/Investment';
import { YahoofinanceService } from 'src/services/yahoofinance.service';
import { InvestmentsService } from 'src/services/investments.service';
import { AccountService } from 'src/services/account.service';
import { Account } from 'src/models/Account';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(private yahooService: YahoofinanceService, 
    private investmentService: InvestmentsService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.getTopInvestmentsByUser(this.getTopByUserParams.userId);
  }

  //Parameters
  getTopByUserParams = {userId: 1001}
  
  //Reported from service
  reportTopGainers: any[] = [];
  reportTopLosers: any[] = [];

  getTopInvestmentsByUser(userId: number): void {
    let accList: Account[] = [];
    this.accountService.getByUser({userId: userId}).subscribe( (data: Account[])=>{
        if (data.length !== 0) {
          accList = data;
        }
    } )
    let invsList: Investment[] = [];
    for (let i = 0; i < accList.length; i++) {
      this.investmentService.getInvestmentsByAccountId({accountId: accList[i].accountId}).subscribe(
        (data: Investment[]) => {
          invsList = invsList.concat(data);
        }
      )
    }
    let gains:any[] = [];
    // for (let i = 0; i < invsList.length; i++) {
    //   this.yahooService.getSummary({symbol: invsList[i].symbol}).subscribe(
    //     (response: any) => {
    //       if (response.price.regularMarketChange !== null) {
    //         let temp = {
    //           investment: invsList[i],
    //           change: response.price.regularMarketChange.fmt
    //         }
    //         gains.push(temp);
    //       }
    //     }
    //   )
    //}
    for (let i = 0; i < invsList.length; i++) {
      this.yahooService.getChange({symbol: invsList[i].symbol}).subscribe(
           (response: any) => {
            if (response !== undefined) {
              gains.push(response);
            }
            
    });

    gains.sort(function(a,b) {
      if (a.regularMaketChange > b.regularMaketChange) return 1;
      if (a.regularMaketChange < b.regularMaketChange) return -1;
      return 0;
    });
    this.reportTopLosers = gains.slice(0,5);
    this.reportTopGainers = gains.slice(gains.length - 5, gains.length);
    console.log(gains)
  }

}}
