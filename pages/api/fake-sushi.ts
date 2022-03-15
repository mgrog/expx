import {ExtendedPoolDataWithSeries} from '@root/pages/api/data.types';
import {formatISO, sub} from 'date-fns';
import type {NextApiRequest, NextApiResponse} from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtendedPoolDataWithSeries>,
) {
  setTimeout(() => res.status(200).json(fakeSushi), 2000);
}

const randGen = (min: number, max: number) => Math.random() * (max - min) + min;

const fakeSushi = {
  name: 'SOL',
  chain: 'Solana',
  protocol: 'Sushi',
  base: 0.043,
  reward: 0,
  rewards: {},
  apy: 0.23,
  apy_7_day: null,
  tvl: 7183920182,
  risk: {},
  series: Array.from({length: 30}).map((x, i, a) => {
    let rand = randGen(0.01, 0.3);
    let date = formatISO(sub(new Date(2022, 3, 14, 15, 29, 20), {days: a.length - i}));
    return {apy: rand.toFixed(8), tvl: '1000000', date};
  }),
};
