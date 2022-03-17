import {styled} from '@root/stitches.config';

export const Input = styled('input', {
  border: 'none',
  borderRadius: 5,
  height: 35,
  fontSize: '$2',
  px: 10,
  variants: {
    fluid: {
      true: {
        width: '100%',
      },
    },
    error: {
      true: {
        border: 'solid 1px $error-red',
      },
    },
  },
});
