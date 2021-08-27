import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuAllModule, SidebarModule, TreeViewAllModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { ChartAllModule, RangeNavigatorAllModule, StockChartAllModule, ChartAnnotationService } from '@syncfusion/ej2-angular-charts';

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


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    OverviewComponent,
    MarketComponent,
    AccountsComponent,
    AccountHistoryComponent,
    BankingComponent,
    InvestmentsComponent
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
    StockChartAllModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
