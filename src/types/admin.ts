export interface AdminStats {
  totalRevenue: {
    usd: number;
    btc: number;
    eth: number;
    growth: number;
  };
  totalOrders: {
    count: number;
    growth: number;
  };
  activeUsers: {
    count: number;
    growth: number;
  };
  conversionRate: {
    rate: number;
    growth: number;
  };
}

export interface AdminTableColumn<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (info: { row: { original: T } }) => React.ReactNode;
}