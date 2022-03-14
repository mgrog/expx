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
        },
        {
          name: 'SOL',
          chain: 'Solana',
          protocol: 'Sushi',
          apy: 0.098,
          tvl: 5997508308,
        },
        {
          name: 'AVAX',
          chain: 'Avalanche',
          protocol: 'Curve',
          apy: 0.155,
          tvl: 5997508308,
        },
      ]),
    1000,
  );
}
