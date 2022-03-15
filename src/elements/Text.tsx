import {styled} from '@root/stitches.config';

export const Text = styled('h3', {
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
    padded: {
      true: {
        marginBottom: 15,
      },
    },
  },
  defaultVariants: {
    color: 'light',
  },
});
