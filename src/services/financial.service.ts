import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  constructor(private http: HttpClient) { }
  
  // we need a method of this service - in this case we call an API end-point
  getApiData(params={category:''}){ // all httpClient services are OBSERVABLES
    return this.http.get(`http://financialdashboard-financialdashboard.namdevops27.conygre.com/${params.category}`)
  }
}
