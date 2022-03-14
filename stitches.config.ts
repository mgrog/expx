import {createStitches} from '@stitches/react';

export const {styled, css, keyframes} = createStitches({
  media: {
    bp1: '(min-width: 640px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
  },
  theme: {
    colors: {
      periwinkle: '#555FDA',
      'gray-100': '#F8FAFC',
      'gray-700': '#304858',
      'gray-800': '#131722',
      blue: '#2962FF',
      green: '#00BFA5',
      'angled-violet-gradient': 'linear-gradient(to bottom right, #555FDA, #6D1AB1)',
    },
  },
  utils: {
    mx: (value: number | string) => ({
      marginLeft: value,
      marginRight: value,
    }),

    px: (value: number | string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),

    pt: (value: number | string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});
