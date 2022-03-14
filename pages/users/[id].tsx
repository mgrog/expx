import Flipper from '@components/Flipper';
import {Box, Card, Spinner, Text} from '@primitives';
import React, {Suspense} from 'react';
import dynamic from 'next/dynamic';
const LineChart = dynamic(() => import('@components/LineChart'), {ssr: false});
const BarChart = dynamic(() => import('@components/BarChart'), {ssr: false});
const PoolSelector = dynamic(() => import('@components/PoolSelector'), {ssr: false});

function AccountPage() {
  return (
    <Box
      css={{
        display: 'flex',
        width: '60%',
        flexDirection: 'column',
        height: 'auto',
        alignItems: 'center',
        margin: '20px auto',
        marginTop: 100,
      }}>
      <Box
        css={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          flex: 1,
          alignItems: 'center',
          gap: 10,
          flexWrap: 'wrap',
          margin: 'auto',
        }}>
        <Card css={{width: '60vw', height: 400}}>
          <Suspense fallback={<Spinner />}>
            <Text css={{marginBottom: 15}}>Apy over time</Text>
            <LineChart width={1000} height={300} maxValue={0.12} url='/api/fake-lido' />
          </Suspense>
        </Card>
        <Card css={{display: 'flex', flex: 1, height: 350, px: 0}}>
          <Suspense fallback={<Spinner />}>
            <PoolSelector />
          </Suspense>
        </Card>
        <Card css={{flex: 1, display: 'flex', height: 350}}>
          <Suspense fallback={<Spinner />}>
            <BarChart width={500} height={300} maxValue={0.25} selectedPoolIndex={1} />
          </Suspense>
        </Card>
      </Box>
    </Box>
  );
}

export default AccountPage;
