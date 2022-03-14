import {styled} from '@root/stitches.config';

export const Text = styled('h2', {
  margin: 0,
  variants: {
    color: {
      light: {
        color: 'white',
      },
      dark: {
        color: 'black',
      },
    },
    family: {
      alternate: {
        fontFamily: 'Manrope, sans-serif',
      },
    },
  },
  defaultVariants: {
    color: 'light',
  },
});
