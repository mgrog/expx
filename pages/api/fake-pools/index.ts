import {PoolData} from '@root/pages/api/data.types';
import type {NextApiRequest, NextApiResponse} from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<PoolData[]>) {
  setTimeout(
    () =>
      res.status(200).json([
        {
          name: 'ETH',
          chain: 'Ethereum',
          protocol: 'Lido',
          apy: 0.043,
          tvl: 5997508308,
          icon: '/eth.svg',
        },
        {
          name: 'SOL',
          chain: 'Solana',
          protocol: 'Sushi',
          apy: 0.098,
          tvl: 309923232,
          icon: '/sushi.svg',
        },
        {
          name: 'AVAX',
          chain: 'Avalanche',
          protocol: 'Pancake',
          apy: 0.155,
          tvl: 2317293232,
          icon: '/pancake.svg',
        },
        {
          name: 'AVAX',
          chain: 'Polygon',
          protocol: 'Balancer',
          apy: 0.09,
          tvl: 8756463521,
          icon: '/balancer.svg',
        },
      ]),
    1500,
  );
}
