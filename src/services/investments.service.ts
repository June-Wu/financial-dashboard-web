import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Investment } from 'src/models/Investment';
import { Observable, of } from 'rxjs';
import { INVESTMENTS } from 'src/app/mock-investments';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {
  constructor(private http: HttpClient) { }
  
  // we need a method of this service - in this case we call an API end-point
  //getInvestmentsByAccountId(params: any): Observable<Investment[]> { // all httpClient services are OBSERVABLES
    //return this.http.get(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/investments/${params.accountId}`);
  //}

  getInvestmentsByAccountId(params: any): Observable<Investment[]> {
    const investments = of(INVESTMENTS.filter(i => {
      return i.accountId === params.accountId;
    }));
    return investments;
  
  }


}
