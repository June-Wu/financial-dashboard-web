import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ITooltipRenderEventArgs, IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { YahoofinanceService } from 'src/services/yahoofinance.service';
import { ChartDataPoint } from 'src/models/stock-chart-data-point';
import { StockInfo } from 'src/models/stock-info';

@Component({
    selector: 'app-market',
    templateUrl: './market.component.html',
    styleUrls: ['./market.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MarketComponent implements OnInit {
    dataSource: ChartDataPoint[] = [];
    stockInfo!: StockInfo;
    apiResponse: string = '';
    stockSymbolInput = '';
    searchStockParamObj = {symbol:'spy'};

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

    constructor(private yfService: YahoofinanceService) { }

    searchStock() {
        this.yfService.getStockChart(this.searchStockParamObj).subscribe((response: any) => {
            
            if (response.chart.result == null) {
                this.apiResponse = response.chart.error.description;
                return;
            }
            var result = response.chart.result[0];
            this.apiResponse = '';
            this.dataSource = [];
            console.log(result.timestamp);
            console.log(result.timestamp.length);

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
            console.log(this.dataSource);
            console.log(this.stockInfo);
        })
    }
    ngOnInit(): void {
        this.searchStock();
    }

}
