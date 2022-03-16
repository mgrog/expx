import {LogInPayload} from '@root/pages/api/data.types';
import type {NextApiRequest, NextApiResponse} from 'next';

// users in JSON file for simplicity, store in a db for production applications
const users = require('../../../data/users.json');

const secret = 'my_secret';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } else {
  }

  const user = users.find((u: LogInPayload) => {
    return u.username === req.body.username && u.password === req.body.password;
  });

  if (!user) {
    res.status(401).json({message: 'Username or password is incorrect'});
  }
  res.status(200).json({
    id: 5301,
    username: 'test user',
    contracts: [
      {
        id: '000301',
        symbol: 'eth_lido',
        holding: 325.1,
      },
    ],
  });
};
