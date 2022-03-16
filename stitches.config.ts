import {createStitches} from '@stitches/react';

export const {styled, css, keyframes, getCssText} = createStitches({
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
      'violet-800': '#100958',
      'error-red': '#cc0000',
    },
    fontSizes: {
      1: '12px',
      2: '16px',
      3: '32px',
      4: '40px',
      5: '64px',
      6: '96px',
    },
  },
  utils: {
    mx: (value: number | string) => ({
      marginLeft: value,
      marginRight: value,
    }),

    my: (value: number | string) => ({
      marginTop: value,
      marginBottom: value,
    }),

    px: (value: number | string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),

    py: (value: number | string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    radLeft: (value: number | string) => ({
      borderTopLeftRadius: value,
      borderBottomLeftRadius: value,
    }),

    radRight: (value: number | string) => ({
      borderTopRightRadius: value,
      borderBottomRightRadius: value,
    }),
  },
});
