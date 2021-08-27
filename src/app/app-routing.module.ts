import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountHistoryGraphComponent } from './account-history-graph/account-history-graph.component';
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
    path: 'markets',
    component: MarketComponent
  }, {
    path: 'user-profile',
    component: UserProfileComponent
  }, {
    path: 'banking',
    component: BankingComponent
  }, {
    path: 'investment',
    component: InvestmentsComponent
  }, {
    path: 'account-history',
    component: AccountHistoryGraphComponent
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
