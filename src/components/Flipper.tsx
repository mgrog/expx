import {Box, Button, Slide} from '@elements';
import {useFlipTransition} from '@root/src/hooks/useFlipTransition';
import React, {ReactNode, useEffect, useState} from 'react';

type Props<T> = {
  list: T[];
  renderItem: (item: T) => ReactNode;
  setSelected: (val: number) => void;
};

function Flipper<T = any>({renderItem, list, setSelected}: Props<T>) {
  const [[index, dir], setIndex] = useState<[number, 'l' | 'r' | undefined]>([0, undefined]);
  const [transitions] = useFlipTransition([index, dir]);

  const flip = (dir: number) =>
    setIndex((state) => [(state[0] + dir + list.length) % list.length, dir > 0 ? 'l' : 'r']);

  useEffect(() => {
    setSelected(index);
  }, [index, setSelected]);

  return (
    <Box css={{display: 'flex', height: '100%', width: '100%'}}>
      <Button icon onClick={() => flip(-1)}>
        <img width={50} height={'100%'} src='/chevron-left.svg' />
      </Button>
      <Box w-full>
        <Box h-full css={{position: 'relative'}}>
          {transitions((styles, index) => (
            <Slide style={styles}>{renderItem(list[index])}</Slide>
          ))}
        </Box>
      </Box>
      <Button icon onClick={() => flip(1)}>
        <img width={50} height={'100%'} src='/chevron-right.svg' />
      </Button>
    </Box>
  );
}

export default Flipper;
