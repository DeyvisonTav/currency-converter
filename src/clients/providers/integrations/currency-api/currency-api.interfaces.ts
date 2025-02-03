export interface ExchangeRateResponse {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}
