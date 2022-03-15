import {LogInPayload} from '@root/pages/api/data.types';
import type {NextApiRequest, NextApiResponse} from 'next';
const jwt = require('jsonwebtoken');
import Cookies from 'js-cookie';

// users in JSON file for simplicity, store in a db for production applications
const users = require('../../../data/users.json');

const secret = 'my_secret';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const creds = {
    username: 'user@expx.fi',
    password: 'Br98PKe*js76QaF@1OdX',
  };
  const user = users.find((u: LogInPayload) => {
    return u.username === creds.username && u.password === creds.password;
  });

  if (user) {
    const token = jwt.sign({name: 'person'}, secret, {expiresIn: '7d'});
    Cookies.set('jwt', token);
    res.send(JSON.stringify(user, null, 2));
  } else {
    res.status(401).end('Not Authenticated');
  }
};
