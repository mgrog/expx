import {styled} from '@root/stitches.config';
import React from 'react';
import {Box} from './Box';

const Spin = styled('div', {
  flex: 1,
  minHeight: 30,
  minwidth: 30,
  margin: 'auto',
});

function Spinner() {
  return (
    <Box
      css={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Spin className='la-ball-clip-rotate-multiple la-2x'>
        <div />
        <div />
      </Spin>
    </Box>
  );
}

export {Spinner};
