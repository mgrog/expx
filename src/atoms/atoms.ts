import {User} from '@root/pages/api/data.types';
import {atom} from 'jotai';

const userAtom = atom<User | null>(null);

const selectedPoolAtom = atom(0);

export {userAtom, selectedPoolAtom};
