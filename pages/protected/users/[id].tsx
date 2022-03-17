import {Box, Card, Spinner, Text} from '@elements';
import React, {Suspense, useCallback, useEffect, useMemo, useState} from 'react';
import dynamic from 'next/dynamic';
import {useAtom} from 'jotai';
import {selectedPoolIndexAtom} from '@root/src/atoms';
const LineChart = dynamic(() => import('@components/LineChart'), {ssr: false});
const BarChart = dynamic(() => import('@components/BarChart'), {ssr: false});
const PoolSelector = dynamic(() => import('@components/PoolSelector'), {ssr: false});

function AccountPage() {
  const [selectedPoolIndex] = useAtom(selectedPoolIndexAtom);
  const [lineChartWidth, setLineChartWidth] = useState(350);
  const [lineChartHeight, setLineChartHeight] = useState(200);
  const [numLinePoints, setNumLinePoints] = useState(15);

  // line chart size is controlled, not scaled
  const resizeLineChart = useCallback((width: number, height: number, dataPoints: number) => {
    setLineChartWidth(width);
    setLineChartHeight(height);
    setNumLinePoints(dataPoints);
  }, []);

  useEffect(() => {
    function calcBreakpoints() {
      if (window.screen.width >= 470 && window.screen.width < 640) {
        return resizeLineChart(400, 200, 20);
      }
      if (window.screen.width >= 640 && window.screen.width < 768) {
        return resizeLineChart(500, 300, 30);
      }
      if (window.screen.width >= 768 && window.screen.width < 1024) {
        return resizeLineChart(750, 300, 30);
      }
      if (window.screen.width >= 1024) {
        return resizeLineChart(950, 300, 30);
      }
      // initial case, smallest size
      resizeLineChart(320, 200, 15);
    }
    // init sizes
    calcBreakpoints();
    setNumLinePoints(window.screen.width >= 640 ? 30 : 15);
    window.addEventListener('resize', calcBreakpoints);
    return () => {
      window.removeEventListener('resize', calcBreakpoints);
    };
  }, []);

  return (
    <Box
      flex
      col
      centered='horizontal'
      w-full
      css={{
        marginTop: 100,
        '@bp2': {marginLeft: 20, width: 900},
        '@bp3': {marginLeft: 40, width: 1100},
      }}>
      <Box flex grow centered='vertical' w-full>
        <Card
          rounded={{'@bp2': true}}
          fluid
          css={{
            height: '100%',
            paddingRight: 0,
            flexBasis: '100vw',
            '@bp1': {width: 600},
            '@bp2': {width: 700},
            '@bp3': {width: 900},
          }}>
          <Box flex col centered='vertical' css={{minHeight: 235, '@bp1': {minHeight: 325}}}>
            <Suspense fallback={<Spinner />}>
              <LineChart
                width={lineChartWidth}
                height={lineChartHeight}
                maxValue={0.5}
                selectedPoolIndex={selectedPoolIndex}
                numDataPoints={numLinePoints}
              />
            </Suspense>
          </Box>
        </Card>
      </Box>
      <Box
        flex
        w-full
        css={{flexWrap: 'wrap-reverse', gap: 10, my: 10, '@bp2': {flexWrap: 'nowrap'}}}>
        <Card
          rounded={{'@bp2': true}}
          css={{
            display: 'flex',
            flex: 1,
            flexBasis: '100vw',
            px: 0,
            height: 300,
            '@bp1': {flexBasis: '40vw'},
          }}>
          <Suspense fallback={<Spinner />}>
            <PoolSelector />
          </Suspense>
        </Card>
        <Card
          rounded={{'@bp2': true}}
          css={{
            flex: 1,
            flexBasis: '100vw',
            height: 220,
            '@bp0': {height: 300},
            '@bp1': {flexBasis: '40vw'},
          }}>
          <Suspense fallback={<Spinner />}>
            <Text padded>Yield Compared to Other Pools</Text>
            <Box
              css={{
                transform: 'scale(0.7)',
                transformOrigin: 'top left',
                '@bp0': {transform: 'scale(1)'},
              }}>
              <BarChart
                width={400}
                height={220}
                maxValue={0.25}
                selectedPoolIndex={selectedPoolIndex}
              />
            </Box>
          </Suspense>
        </Card>
      </Box>
    </Box>
  );
}

export default AccountPage;
