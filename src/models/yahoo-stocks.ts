export class StockInfo {
  symbol!: string;
  instrumentType!: string;
  currency!: string;
  currentPrice!: number;
  previousClose!: number;
}

export class ChartDataPoint {
  x!: Date;
  open!: number;
  high!: number;
  low!: number;
  close!: number;
  volume!: number;
}