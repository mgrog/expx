// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {formatISO, sub} from 'date-fns';
import type {NextApiRequest, NextApiResponse} from 'next';

const randGen = (min: number, max: number) => Math.random() * (max - min) + min;

const genSeries = () => {
  return Array.from({length: 30}).map((x, i, a) => {
    let rand = randGen(0.01, 0.3);
    let date = formatISO(sub(new Date(2022, 3, 14, 15, 29, 20), {days: a.length - i}));
    return {apy: rand.toFixed(8), tvl: '1000000', date};
  });
};

const fakeLido = require('../../../data/lido-data.json');

const sushiSeries = genSeries();
const fakeSushi = {
  name: 'SOL',
  chain: 'Solana',
  protocol: 'Sushi',
  base: sushiSeries.slice(-1)[0].apy,
  reward: 0,
  rewards: {},
  apy: sushiSeries.slice(-1)[0].apy,
  apy_7_day: null,
  tvl: 7183920182,
  risk: {},
  series: sushiSeries,
};

const pancakeSeries = genSeries();
const fakePancake = {
  name: 'AVAX',
  chain: 'Avalanche',
  protocol: 'Pancake',
  base: pancakeSeries.slice(-1)[0].apy,
  reward: 0,
  rewards: {},
  apy: pancakeSeries.slice(-1)[0].apy,
  apy_7_day: null,
  tvl: 7183920182,
  risk: {},
  series: pancakeSeries,
};

const balancerSeries = genSeries();
const fakeBalancer = {
  name: 'AVAX',
  chain: 'Avalanche',
  protocol: 'Balancer',
  base: balancerSeries.slice(-1)[0].apy,
  reward: 0,
  rewards: {},
  apy: balancerSeries.slice(-1)[0].apy,
  apy_7_day: null,
  tvl: 7183920182,
  risk: {},
  series: balancerSeries,
};

const data = [fakeLido, fakeSushi, fakePancake, fakeBalancer];

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const {pid} = req.query;

  setTimeout(() => res.status(200).json(data[+pid]), 500);
}
