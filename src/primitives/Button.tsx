import {styled} from '@root/stitches.config';

export const Button = styled('button', {
  borderRadius: 8,
  padding: '5px 20px',
  fontSize: '1.1em',
  /* a little reset */
  backgroundColor: 'transparent',
  border: 'none',
  /* ... */
  variants: {
    color: {
      'gradient-violet': {
        backgroundImage: '$angled-violet-gradient',
        color: 'white',
      },
      periwinkle: {
        backgroundColor: '#555FDA',
        color: 'white',
      },
    },
    size: {
      large: {
        fontSize: '1.4em',
        padding: '10px 30px',
      },
    },
    ui: {
      reactive: {
        '&:hover': {
          filter: 'brightness(110%)',
        },
        '&:active': {
          filter: 'brightness(90%)',
        },
      },
    },
    icon: {
      true: {
        backgroundColor: 'transparent',
        borderRadius: 0,
        padding: 0,
        backgroundImage: 'none',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
  },
  defaultVariants: {
    color: 'gradient-violet',
    ui: 'reactive',
  },
});
