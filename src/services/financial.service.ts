import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  constructor(private http: HttpClient) { }
  uid:number = 1001;

  sendOrderRequest(params= { aid: 12345, action: 'buy', symbol: '', quantity: 100, price: 0} ) { // all httpClient services are OBSERVABLES
    if (params.action == 'buy') {
      var response = this.http.get(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/investments/${params.aid}`);
      console.log(response);
    } else if (params.action == 'sell') {
      var response = this.http.get(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/investments/investmentAccount/users/${this.uid}`);
      console.log(response);  
    }
    return null;
    return this.http.post(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/investments`,
      {accountId:params.aid, symbol:params.symbol, position:params.quantity, averagePrice:params.price})
  }

  getUserInvestmentAccounts() {
    return this.http.get(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/investments/investmentAccount/users/${this.uid}`);
  }

  getUserInfo() {
    return this.http.get(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/users/${this.uid}`);
  }
}
