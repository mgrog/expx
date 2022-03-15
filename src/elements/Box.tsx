import {styled} from '@root/stitches.config';

export const Box = styled('div', {
  variants: {
    flex: {
      true: {
        display: 'flex',
      },
    },
    col: {
      true: {
        flexDirection: 'column',
      },
    },
    grow: {
      true: {
        flex: 1,
      },
    },
    'w-full': {
      true: {
        width: '100%',
      },
    },
    'h-full': {
      true: {
        height: '100%',
      },
    },
    centered: {
      horizontal: {
        justifyContent: 'center',
      },
      vertical: {
        alignItems: 'center',
      },
      true: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
  compoundVariants: [
    {
      col: true,
      centered: 'horizontal',
      css: {
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    },
    {
      col: true,
      centered: 'vertical',
      css: {
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
    },
  ],
});
