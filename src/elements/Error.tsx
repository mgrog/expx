import {styled} from '@root/stitches.config';

export const Error = styled('div', {
  display: 'none',
  color: '$error-red',
  fontSize: '$1',
  marginTop: 2,
  variants: {
    visible: {
      true: {
        display: 'block',
      },
    },
  },
});
