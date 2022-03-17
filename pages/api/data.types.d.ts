export type SeriesDataPoint = {
  date: string;
  apy: string;
  tvl: string;
};

export type PoolData = {
  name: string;
  chain: string;
  protocol: string;
  apy: number;
  tvl: number;
  selected?: boolean;
  icon: string;
};

export type ExtendedPoolData = {
  base: number;
  reward: number;
  rewards: any;
  apy_7_day: number | null;
  risk: any;
} & PoolData;

export type ExtendedPoolDataWithSeries = {
  series: SeriesDataPoint[];
} & ExtendedPoolData;

export type User = {
  id: number;
  username: string;
  contracts: {
    id: string;
    symbol: string;
    holding: number;
  }[];
};

export type LogInPayload = {
  username: string;
  password: string;
};
