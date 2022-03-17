import {displayPercent} from '@root/lib/utils';
import {PoolData, User} from '@root/pages/api/data.types';
import {atom} from 'jotai';

const userAtom = atom<User | null>(null);

const fetchUserAtom = atom(null, (_get, set, _update) => {
  // obviously this would be an api call
  let user = {
    id: 5301,
    username: 'test user',
    contracts: [
      {
        id: '000301',
        symbol: 'eth_lido',
        holding: 325.1,
      },
    ],
  };
  set(userAtom, user);
});

const selectedPoolAtom = atom<(PoolData & {index: number}) | null>(null);

const selectedPoolIndexAtom = atom((get) => get(selectedPoolAtom)?.index || 0);

const selectedPoolApyAtom = atom((get) => displayPercent(get(selectedPoolAtom)?.apy, 1));

export {userAtom, fetchUserAtom, selectedPoolAtom, selectedPoolIndexAtom, selectedPoolApyAtom};
