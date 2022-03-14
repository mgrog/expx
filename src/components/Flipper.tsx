import React, {ReactNode, useState} from 'react';
import Image from 'next/image';
// import Left from '@public/chevron-left.svg';
// import Right from '@public/chevron-right.svg';
import {Card, Box, Button, Slide} from '@primitives';
import {useFlipTransition} from '@root/src/hooks/useFlipTransition';
import {fetcher} from '@root/fetcher';
import {PoolData} from '@root/pages/api/data.types';
import useSWR from 'swr';

type Props = {
  children: ReactNode;
  header?: ReactNode;
  dataLength: number;
};

function Flipper({children, header, dataLength}: Props) {
  const [[index, dir], setIndex] = useState<[number, 'l' | 'r' | undefined]>([0, undefined]);
  const [transitions] = useFlipTransition([index, dir]);

  const flip = (dir: number) =>
    setIndex((state) => [(state[0] + dir + dataLength) % dataLength, dir > 0 ? 'l' : 'r']);

  return (
    <Box css={{display: 'flex', height: '100%', width: '100%'}}>
      <Button icon onClick={() => flip(-1)}>
        <Image width={50} height={'100%'} src='/chevron-left.svg' />
      </Button>
      <Box css={{width: '100%'}}>
        {header}
        <Box
          css={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            top: 20,
          }}>
          {transitions((styles, item) => (
            <Slide style={styles}>{children}</Slide>
          ))}
        </Box>
      </Box>
      <Button icon onClick={() => flip(1)}>
        <Image width={50} height={'100%'} src='/chevron-right.svg' />
      </Button>
    </Box>
  );
}

export default Flipper;
