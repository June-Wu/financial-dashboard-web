import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  constructor(private http: HttpClient) { }
  uid: number = 1001;

  getUserInfo() {
    return this.http.get(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/users/${this.uid}`);
  }

  getUserAccounts() {
    return this.http.get(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/accounts/uid/${this.uid}`);
  }

  getUserAccountByAid(params = { aid: 12345 }) {
    return this.http.get(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/accounts/aid/${params.aid}`);
  }

  getUserInvestmentAccounts() {
    return this.http.get(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/investments/investmentAccount/users/${this.uid}`);
  }

  getInvestmentAccountByAid(params = { aid: 12345 }) {
    return this.http.get(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/investments/investmentAccount/${params.aid}`);
  }

  geAccountInvestments(params = { aid: 12345 }) {
    console.log(params)
    return this.http.get(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/investments/${params.aid}`);
  }

  postAccountInvestment(params = { aid: 12345, action: 'buy', symbol: '', quantity: 100, price: 0 }) {
    
    if (params.quantity = 0) {
      return this.http.delete(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/investments/instrument/${params.symbol}`);
    }
    return this.http.post(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/investments`,
    { accountId: params.aid, symbol: params.symbol, position: params.quantity, averagePrice: params.price });
  }

  postInvestmentAccount(params:any) {
    return this.http.post(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/investments/investmentAccount`,
      {
        userId: params.userId,
        accountId: params.accountId,
        accountName: params.accountName,
        accountType: params.accounType,
        value: params.value,
        investmentType: params.investmentType,
        cash: params.cash
      });
  }

}
