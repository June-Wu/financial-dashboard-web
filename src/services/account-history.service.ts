import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { AccountHistory } from 'src/models/Account-History';
import { AccountService } from './account.service';
import { NetWorth } from 'src/models/Net-Worth';
import { Account } from 'src/models/Account';
// remove later
import { ACCOUNTHISTORY } from 'src/app/mock-account-history';

@Injectable({
  providedIn: 'root'
})
export class AccountHistoryService {

  constructor(private http:HttpClient, private accountService: AccountService) { }

  getByAccountId(params: any): Observable<AccountHistory[]>{ 
    //return this.http.get(`localhost:8080/accounts/${params.accountId}`)
    const accountHistories = of(ACCOUNTHISTORY.filter(a => {
      return a.accountId === Number(params.accountId)
    }));
    return accountHistories;
  }

  getNetWorthByUserId(params: any): Observable<NetWorth[]>{ 
    //return this.http.get(`localhost:8080/accounts/${params.accountId}`)
    let netWorthHistory: NetWorth[] = [];
    let accountList: Account[] = [];
    this.accountService.getByUser(params)
    .subscribe( (data: Account[])=>{
        accountList = data;
    })
    for (let i = 0; i < accountList.length; i++) {
      this.getByAccountId({accountId: accountList[i].accountId}).subscribe((accHisList: AccountHistory[]) => {
        accHisList.forEach( function(accHis) {
            if (netWorthHistory.filter(nw => nw['date'] === accHis.date).length > 0) {
              netWorthHistory.filter(nw => nw['date'] === accHis.date)[0].netWorth += accHis.value;
            } else {
              let temp: NetWorth = {
                date: accHis.date,
                userId: accountList[i].userId,
                netWorth: accHis.value
              }
              netWorthHistory.push(temp);
            }
          });
        }
      );
    }
    return of(netWorthHistory);
  }
}
