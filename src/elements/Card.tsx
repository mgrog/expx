import {styled} from '@root/stitches.config';

export const Card = styled('div', {
  padding: 15,
  borderRadius: 10,
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
    size: {
      medium: {
        width: 400,
        height: 300,
      },
    },
  },
  defaultVariants: {
    color: 'dark',
    size: 'medium',
  },
});
