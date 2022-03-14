import Flipper from '@components/Flipper';
import {fetcher} from '@root/fetcher';
import {PoolData} from '@root/pages/api/data.types';
import React from 'react';
import useSWR from 'swr';
import {Text} from '@primitives';

function PoolSelector() {
  const {data} = useSWR<PoolData[], any>('/api/fake-pools', fetcher, {suspense: true});

  return (
    <Flipper dataLength={data!.length}>
      <Text>Hi</Text>
    </Flipper>
  );
}

export default PoolSelector;
