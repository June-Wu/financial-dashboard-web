import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Account } from 'src/app/Account';
import { Observable, of } from 'rxjs';
// remove later
import { ACCOUNTS } from 'src/app/mock-accounts';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }
  
  getApiData(params: any): Observable<Account | undefined>{ 
    //return this.http.get(`localhost:8080/accounts/${params.accountId}`)
    const account = of(ACCOUNTS.find(a => {
      return a.accountId === params.accountId
    }));
    return account;
  }
}
