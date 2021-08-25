import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountHistoryComponent } from './account-history/account-history.component';
import { AccountsComponent } from './accounts/accounts.component';
import { BankingComponent } from './banking/banking.component';
import { InvestmentsComponent } from './investments/investments.component';
import { MarketComponent } from './market/market.component';
import { OverviewComponent } from './overview/overview.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  }, {
    path: 'overview',
    component: OverviewComponent
  }, {
    path: 'accounts',
    component: AccountsComponent
  }, {
    path: 'market',
    component: MarketComponent
  }, {
    path: 'user-profile',
    component: UserProfileComponent
  }, {
    path: 'banking',
    component: BankingComponent
  }, {
    path: 'investments',
    component: InvestmentsComponent
  }, {
    path: 'account-history',
    component: AccountHistoryComponent
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
