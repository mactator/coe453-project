export interface OverallStats {
  total_malls: number;
  total_sales: number;
  total_visitors: number;
  total_alarms: number;
}

export interface MallStats {
  mall_id: string;
  total_sales: number;
  mall_entries: number;
  alarms_triggered: number;
}

export interface StoreSummary {
  store_id: string;
  sales: number;
  events: number;
}
