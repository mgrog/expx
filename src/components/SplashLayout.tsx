import {Box, Text} from '@primitives';
import {styled} from '@root/stitches.config';
import React, {ReactNode} from 'react';

const StyledLayout = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  minHeight: '100vh',
  height: 'auto',
  backgroundRepeat: 'no-repeat',

  variants: {
    size: {
      desktop: {
        backgroundImage: 'url(/expx.svg)',
        backgroundPosition: 'right 200px top 100px',
      },
      mobile: {
        backgroundImage: 'url(/expx-mobile.svg)',
        backgroundPosition: 'center calc(10% + 125px)',
      },
    },
  },
});

const StyledHeader = styled(Text, {
  '& b': {
    color: '$periwinkle',
  },
  variants: {
    screen: {
      desktop: {
        position: 'static',
        fontSize: 96,
        marginTop: 50,
        marginLeft: 15,
      },
      mobile: {
        position: 'absolute',
        fontSize: 64,
        left: 'calc(50% - 100px)',
        top: 'calc(10% + 10px)',
      },
    },
  },
});

const SplashLayout = ({children}: {children: ReactNode}) => (
  <StyledLayout size={{'@initial': 'mobile', '@bp3': 'desktop'}}>
    <StyledHeader as='h1' family='alternate' screen={{'@initial': 'mobile', '@bp2': 'desktop'}}>
      Expx<b>.Fi</b>
    </StyledHeader>
    <Box
      css={{
        position: 'absolute',
        top: 'calc(10% + 160px)',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '@bp1': {
          alignItems: 'center',
        },
        '@bp2': {
          alignItems: 'flex-start',
        },
      }}>
      {children}
    </Box>
  </StyledLayout>
);

export {SplashLayout};
