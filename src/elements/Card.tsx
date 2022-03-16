import {styled} from '@root/stitches.config';

export const Card = styled('div', {
  padding: 15,
  borderRadius: 10,
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
  },
  defaultVariants: {
    color: 'dark',
  },
});
