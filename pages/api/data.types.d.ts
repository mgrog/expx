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
