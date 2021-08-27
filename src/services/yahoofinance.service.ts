import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YahoofinanceService {

  constructor(private http: HttpClient) { }

  public getStockChart(params = {symbol:'SPY'}){
    return this.http.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&symbol=${params.symbol}&range=ytd&region=US`,
      {"headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "1a5e3651a7msh74f8051a4f5f966p1d87e8jsn73425a1ad49f"
      }});
  }

  public getSummary(params = {symbol:'SPY'}){
    return this.http.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${params.symbol}&region=US`,
      {"headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "1a5e3651a7msh74f8051a4f5f966p1d87e8jsn73425a1ad49f"
      }});
  }

}
