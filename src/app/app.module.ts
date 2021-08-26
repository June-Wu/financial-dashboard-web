import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuAllModule, SidebarModule, TreeViewAllModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ChartModule } from '@syncfusion/ej2-angular-charts';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { OverviewComponent } from './overview/overview.component';
import { MarketComponent } from './market/market.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountHistoryGraphComponent } from './account-history-graph/account-history-graph.component';
import { BankingComponent } from './banking/banking.component';
import { InvestmentsComponent } from './investments/investments.component';
import { HttpClientModule } from '@angular/common/http';
import { InsightsComponent } from './insights/insights.component';
import { NetWorthGraphComponent } from './net-worth-graph/net-worth-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    OverviewComponent,
    MarketComponent,
    AccountsComponent,
    AccountHistoryGraphComponent,
    BankingComponent,
    InvestmentsComponent,
    InsightsComponent,
    NetWorthGraphComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SidebarModule,
    RadioButtonModule,
    MenuAllModule,
    DropDownListModule,
    ButtonModule,
    TreeViewAllModule,
    ListViewAllModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
