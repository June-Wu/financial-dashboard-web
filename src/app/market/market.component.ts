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
    @ViewChild('ejDialog', { static: true }) ejOrderDialog!: DialogComponent;
    @ViewChild('ejDialog', {static: true}) ejDialogResult!: DialogComponent;
    @ViewChild('container', { read: ElementRef, static: true }) container!: ElementRef;
    buySellHeader: string = '';
    targetElement!: HTMLElement;
    placeOrderParamObj = { aid: 12345, action: 'buy', symbol: '', quantity: 100, price: 0};
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
                if (response[i].accountType != "Investment") {
                    continue;
                }
                var option = document.createElement('option');
                option.textContent = `${response[i]['accountId']} - ${response[i]['accountName']}`;
                option.value = option.textContent;
                document.getElementById('investment-account-dropdown')?.appendChild(option);
            }
        })
    }

    placeStockOrder() {
        this.fincialService.sendOrderRequest(this.placeOrderParamObj)?.subscribe((response: any) => {
            console.log(this.placeOrderParamObj);
            if (response.error != null) {
                this.orderResponseContent = response.error.toString();
            } else {
                this.orderResponseContent = response.toString();
            }
            console.log("placed stock order");
            this.ejOrderDialog.hide();
            this.ejDialogResult.show();
        })
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
