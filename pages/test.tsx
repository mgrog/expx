import {Box, Button, Card, Text} from '@elements';
import {useFlipTransition} from '@root/src/hooks/useFlipTransition';
import {Slide, Spinner} from '@elements';
import dynamic from 'next/dynamic';
import React, {Suspense, useCallback, useState} from 'react';
const LineChart = dynamic(() => import('@components/LineChart'), {ssr: false});
const BarChart = dynamic(() => import('@components/BarChart'), {ssr: false});

function TestPage() {
  const [[index, dir], setIndex] = useState<[number, 'l' | 'r' | undefined]>([0, undefined]);
  const [transitions] = useFlipTransition([index, dir]);

  const handleNextSlide = (dir: number) =>
    setIndex((state) => [(state[0] + dir + 5) % 5, dir > 0 ? 'l' : 'r']);

  return (
    <Box css={{display: 'flex', gap: 10, flexWrap: 'wrap', width: '100%'}}>
      <Card css={{width: 800, height: '100%'}}>
        <Suspense fallback={<Spinner />}>
          <LineChart width={600} height={300} maxValue={0.1} />
        </Suspense>
      </Card>
      <Card>
        <Button>Button</Button>
      </Card>
      <Card css={{position: 'relative'}}>
        <Button onClick={() => handleNextSlide(-1)}>Flip Left</Button>
        <Button onClick={() => handleNextSlide(1)}>Flip Right</Button>
        {transitions((styles, item) => (
          <Slide style={styles}>
            <Text>Some text item: {item}</Text>
            <Text as='h3'>more text</Text>
          </Slide>
        ))}
      </Card>
      <Card css={{width: 600}}>
        <Suspense fallback={<div>'loading...'</div>}>
          <BarChart height={300} width={600} maxValue={0.25} selectedPoolIndex={1} />
        </Suspense>
      </Card>
    </Box>
  );
}

export default TestPage;
