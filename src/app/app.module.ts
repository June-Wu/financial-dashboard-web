import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuAllModule, SidebarModule, TreeViewAllModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { ChartAllModule, ChartModule, RangeNavigatorAllModule, StockChartAllModule, ChartAnnotationService, DateTimeService, DateTimeCategoryService, LegendService, TooltipService, DataLabelService, LineSeriesService } from '@syncfusion/ej2-angular-charts';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { OverviewComponent } from './overview/overview.component';
import { MarketComponent } from './market/market.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountHistoryComponent } from './account-history/account-history.component';
import { BankingComponent } from './banking/banking.component';
import { InvestmentsComponent } from './investments/investments.component';
import { InsightsComponent } from './insights/insights.component';
import { NetWorthGraphComponent } from './net-worth-graph/net-worth-graph.component';
import { AccountDetailsComponent } from './account-details/account-details.component';



@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    OverviewComponent,
    MarketComponent,
    AccountsComponent,
    AccountHistoryComponent,
    BankingComponent,
    InvestmentsComponent,
    InsightsComponent,
    NetWorthGraphComponent,
    AccountDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SidebarModule,
    RadioButtonModule,
    MenuAllModule,
    DropDownListModule,
    ButtonModule,
    TreeViewAllModule,
    ListViewAllModule,
    ChartAllModule,
    RangeNavigatorAllModule,
    StockChartAllModule,
    DialogModule,
    ChartModule
  ],
  providers: [DateTimeService, LineSeriesService, DateTimeCategoryService, LegendService, TooltipService, DataLabelService, LineSeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
