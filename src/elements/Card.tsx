import {styled} from '@root/stitches.config';

export const Card = styled('div', {
  padding: 15,
  width: 400,
  height: 300,
  variants: {
    color: {
      dark: {
        backgroundColor: '#304858',
      },
    },
    fluid: {
      true: {
        width: '100%',
        height: '100%',
      },
    },
    rounded: {
      true: {
        borderRadius: 10,
      },
    },
  },
  defaultVariants: {
    color: 'dark',
  },
});
