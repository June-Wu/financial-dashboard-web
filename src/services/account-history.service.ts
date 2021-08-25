import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { AccountHistory } from 'src/app/Account-History';
// remove later
import { ACCOUNTHISTORY } from 'src/app/mock-account-history';

@Injectable({
  providedIn: 'root'
})
export class AccountHistoryService {

  constructor(private http:HttpClient) { }

  getByAccountId(params: any): Observable<AccountHistory[]>{ 
    //return this.http.get(`localhost:8080/accounts/${params.accountId}`)
    const accountHistories = of(ACCOUNTHISTORY.filter(a => {
      return a.accountId === Number(params.accountId)
    }));
    return accountHistories;
  }
}
