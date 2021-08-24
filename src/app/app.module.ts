import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OverviewComponent } from './overview/overview.component';
import { MarketComponent } from './market/market.component';
import { AccountsComponent } from './accounts/accounts.component';
import { BankingComponent } from './banking/banking.component';
import { InvestmentsComponent } from './investments/investments.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    UserProfileComponent,
    OverviewComponent,
    MarketComponent,
    AccountsComponent,
    BankingComponent,
    InvestmentsComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
