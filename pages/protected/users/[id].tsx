import {Box, Card, Spinner, Text} from '@elements';
import React, {Suspense} from 'react';
import dynamic from 'next/dynamic';
import {useAtom} from 'jotai';
import {selectedPoolAtom} from '@root/src/atoms';
const LineChart = dynamic(() => import('@components/LineChart'), {ssr: false});
const BarChart = dynamic(() => import('@components/BarChart'), {ssr: false});
const PoolSelector = dynamic(() => import('@components/PoolSelector'), {ssr: false});

function AccountPage() {
  const [selectedPoolIndex] = useAtom(selectedPoolAtom);

  return (
    <Box
      flex
      col
      centered='horizontal'
      css={{
        '@bp1': {
          width: 300,
        },
        '@bp3': {
          width: 1200,
        },
        height: 'auto',
        margin: 20,
        marginTop: 100,
      }}>
      <Box flex w-full grow centered='vertical' css={{gap: 10, flexWrap: 'wrap', margin: 'auto'}}>
        <Card css={{width: '100%', height: 400, paddingLeft: 50, paddingRight: 0}}>
          <Suspense fallback={<Spinner />}>
            <Text padded>Apy over time</Text>
            <LineChart
              width={1000}
              height={300}
              maxValue={0.5}
              selectedPoolIndex={selectedPoolIndex}
            />
          </Suspense>
        </Card>
        <Card css={{display: 'flex', flex: 1, height: 350, px: 0}}>
          <Suspense fallback={<Spinner />}>
            <PoolSelector />
          </Suspense>
        </Card>
        <Card css={{flex: 1, height: 350}}>
          <Suspense fallback={<Spinner />}>
            <Text padded>Yield Comparison</Text>
            <BarChart
              width={500}
              height={280}
              maxValue={0.25}
              selectedPoolIndex={selectedPoolIndex}
            />
          </Suspense>
        </Card>
      </Box>
    </Box>
  );
}

export default AccountPage;
