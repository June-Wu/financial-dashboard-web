import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { YAHOO } from 'src/app/mock-yahoo-finance';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YahoofinanceService {

  constructor(private http: HttpClient) { }

  public getStockChart(params = {symbol:'SPY'}){
    return this.http.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&symbol=${params.symbol}&range=ytd&region=US`,
      {"headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "fe64c2341amsh4943f70e7aa3c5cp14dd05jsnbc6fcc0f9c7b"
      }});
  }

  public getChange(params = {symbol:'SPY'}): Observable<Object>{
    const change = of(YAHOO.filter(i => {
      return i.symbol === params.symbol;
    })[0]);
    return change;
  }

}
