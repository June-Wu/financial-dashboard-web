import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ITooltipRenderEventArgs, IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { YahoofinanceService } from 'src/services/yahoofinance.service';
import { StockInfo, ChartDataPoint } from 'src/models/yahoo-stocks';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { Investment, InvestmentAccount } from 'src/models/financial-info';
import { FinancialService } from 'src/services/financial.service';

@Component({
    selector: 'app-market',
    templateUrl: './market.component.html',
    styleUrls: ['./market.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MarketComponent implements OnInit {
    @ViewChild('ejOrderDialog', { static: true }) ejOrderDialog!: DialogComponent;
    @ViewChild('ejResultDialog', {static: true}) ejResultDialog!: DialogComponent;
    @ViewChild('container', { read: ElementRef, static: true }) container!: ElementRef;
    buySellHeader: string = '';
    targetElement!: HTMLElement;
    placeOrderParamObj = { aid: 12345, action: 'buy', symbol: '', quantity: 100, price: 0 };
    accountIdString = '12345';
    accountInvestments:Investment[] = [];
    userInvestmentAccounts: InvestmentAccount[] = [];
    updatedInvestmentAccount: InvestmentAccount = new InvestmentAccount;
    orderResponseContent: string = '';

    dataSource: ChartDataPoint[] = [];
    stockInfo: StockInfo = new StockInfo;
    stockChartResponse: string = '';
    stockSymbolInput = `Price: ${this.stockInfo.currentPrice} ${this.stockInfo.currency}`;
    getStockParamObj = { symbol: 'spy' };

    initializeBuySellTarget: EmitType<object> = () => {
        this.targetElement = this.container.nativeElement.parentElement;
    }

    public hideDialog: EmitType<object> = () => {
        this.ejOrderDialog.hide();
    }

    tooltip: object = { enable: true };
    chartArea: Object = {
        border: {
            width: 0
        }
    };
    enable: boolean = true;

    primaryXAxis: Object = {
        majorGridLines: { color: 'transparent' },
        crosshairTooltip: { enable: true }
    };

    primaryYAxis: Object = {
        lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', width: 0 },
    };
    crosshair: Object = {
        enable: true
    };

    openOrderDialog(arg: any) {
        this.ejOrderDialog.show();
    }

    tooltipRender(args: ITooltipRenderEventArgs): void {
        if (args.text.split('<br/>')[4]) {
            let target: number = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], 10);
            let value: string = (target / 100000000).toFixed(1) + 'B';
            args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
        }
    };

    load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };

    constructor(private yfService: YahoofinanceService, private fincialService: FinancialService) { }

    setInvestmentAccountDropdown() {
        var select = document.getElementById("investment-account-dropdown");
        this.fincialService.getUserInvestmentAccounts().subscribe((response: any) => {
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                var option = document.createElement('option');
                option.textContent = `${response[i]['accountId']} - ${response[i]['accountName']}`;
                option.value = option.textContent;
                document.getElementById('investment-account-dropdown')?.appendChild(option);
            }
        })
    }

    placeStockOrder() {
        this.placeOrderParamObj.aid = parseInt(this.accountIdString);
        this.fincialService.geAccountInvestments(this.placeOrderParamObj).subscribe((investments: any) => {
            this.fincialService.getUserInvestmentAccounts().subscribe((investmentAccounts: any) => {
                console.log('place stock order');
                console.log(investments);
                console.log(investmentAccounts);
                console.log(this.placeOrderParamObj);
                var existingInvestment = null;
                var investmentAccount: any = null;
                var tradeValue = this.placeOrderParamObj.quantity * this.placeOrderParamObj.price;
                for (var i = 0; i < investments.length; i++) {
                    var investment = investments[i];
                    if (investment.symbol == this.placeOrderParamObj.symbol) {
                        existingInvestment = investment;
                        break;
                    }
                }
                for (var i = 0; i < investmentAccounts.length; i++) {
                    var account = investmentAccounts[i];
                    if (account.accountId == this.placeOrderParamObj.aid) {
                        investmentAccount = account;
                    }
                }
                if (this.placeOrderParamObj.action == 'sell') {
                    // need enough shares to sell
                    if (existingInvestment==null || existingInvestment.position < this.placeOrderParamObj.quantity) {
                        this.setResponseDialog(`Short selling not approved. Open positions: ${existingInvestment == null? 0 : existingInvestment.position} Sell quantity: ${this.placeOrderParamObj.quantity}`);
                        return;
                    }
                    investmentAccount.cash += tradeValue;
                    this.placeOrderParamObj.quantity = existingInvestment.quantity - this.placeOrderParamObj.quantity;
                }
                else {
                    // need enough money to buy
                    if (investmentAccount.cash < tradeValue) {
                        this.setResponseDialog(`Insufficient funds. Account balance: ${investmentAccount.cash}  Required cash: ${tradeValue}`);
                        return;
                    }
                    if (existingInvestment != null) {
                        this.placeOrderParamObj.price = (existingInvestment.position * existingInvestment.averagePrice + tradeValue) / (existingInvestment.position + this.placeOrderParamObj.quantity);
                        this.placeOrderParamObj.quantity += existingInvestment.position;
                    }
                    investmentAccount.cash -= tradeValue;
                }
                this.fincialService.postAccountInvestment(this.placeOrderParamObj).subscribe((postResponse: any) => {
                    this.fincialService.postInvestmentAccount(investmentAccount).subscribe((postResponse: any) => {
                        this.setResponseDialog(`Order filled! Current Position: ${this.placeOrderParamObj.quantity==NaN? 0 : this.placeOrderParamObj.quantity} Account balance: ${investmentAccount.cash}`);
                    });
                });
            });
        });
    }

    setResponseDialog(orderResponseContent:any) {
        this.orderResponseContent = JSON.stringify(orderResponseContent);
        this.ejOrderDialog.hide();
        this.ejResultDialog.show();
    }

    searchStock() {
        this.yfService.getStockChart(this.getStockParamObj).subscribe((response: any) => {
            if (response.chart.result == null) {
                this.stockChartResponse = response.chart.error.description;
                return;
            }
            var result = response.chart.result[0];
            this.stockChartResponse = '';
            this.dataSource = [];

            for (var i = 0; i < result.timestamp.length; i++) {
                var chartDataPoint = new ChartDataPoint;
                chartDataPoint.x = new Date(result.timestamp[i] * 1000);
                var quotes = result.indicators.quote[0];
                chartDataPoint.high = quotes.high[i];
                chartDataPoint.low = quotes.low[i];
                chartDataPoint.open = quotes.open[i];
                chartDataPoint.close = quotes.close[i];
                chartDataPoint.volume = quotes.volume[i];
                this.dataSource.push(chartDataPoint);
            }
            this.stockInfo = new StockInfo;
            this.stockInfo.symbol = result.meta.symbol;
            this.stockInfo.instrumentType = result.meta.instrumentType;
            this.stockInfo.currency = result.meta.currency;
            this.stockInfo.currentPrice = result.meta.regularMarketPrice;
            this.stockInfo.previousClose = result.meta.chartPreviousClose;

            this.buySellHeader = `${this.stockInfo.symbol} - ${this.stockInfo.currentPrice} ${this.stockInfo.currency}`;
            this.placeOrderParamObj.symbol = this.stockInfo.symbol;
            this.placeOrderParamObj.price = this.stockInfo.currentPrice;
        })
    }

    ngOnInit(): void {
        this.searchStock();
        this.setInvestmentAccountDropdown();
    }

    ngAfterViewInit(): void {
      }
  

}
