import Flipper from '@components/Flipper';
import {Box, Separator, Text} from '@elements';
import {fetcher} from '@root/fetcher';
import {PoolData} from '@root/pages/api/data.types';
import {selectedPoolAtom} from '@root/src/atoms';
import {displayPercent} from '@lib/utils';
import {useSetAtom} from 'jotai';
import React from 'react';
import useSWR from 'swr';

function PoolSelector() {
  const {data} = useSWR<PoolData[], any>('/api/fake-pools', fetcher, {suspense: true});
  const setPoolAtom = useSetAtom(selectedPoolAtom);
  const changePool = (index: number) => {
    setPoolAtom({index, ...data![index]});
  };

  return <Flipper<PoolData> list={data!} renderItem={PoolItem} setSelected={changePool} />;
}

const PoolItem = (item: PoolData) => (
  <Box flex col centered='horizontal' h-full css={{gap: 10}}>
    <img height={35} width={35} src={item.icon} />
    <Text>{item.protocol}</Text>
    <Text as={'h4'}>{`${item.chain} chain`}</Text>
    <Box flex w-full centered='horizontal' grow css={{marginTop: 30}}>
      <Box flex col centered='horizontal' h-full grow css={{gap: 20, marginTop: 30}}>
        <Text css={{color: '$green'}}>{displayPercent(item.apy, 1)}</Text>
        <Text>APY</Text>
      </Box>
      <Separator orientation='vertical' />
      <Box flex col centered='horizontal' h-full grow css={{gap: 20, marginTop: 30}}>
        <Text css={{fontWeight: '300'}}>{item.tvl}</Text>
        <Text>TVL</Text>
      </Box>
    </Box>
  </Box>
);

export default PoolSelector;
