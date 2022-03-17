import React from 'react';
import {styled, keyframes} from '@stitches/react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import {Box, Button} from '@elements';

const overlayShow = keyframes({
  '0%': {opacity: 0},
  '100%': {opacity: 1},
});

const contentShow = keyframes({
  '0%': {opacity: 0, transform: 'translate(-50%, -48%) scale(.96)'},
  '100%': {opacity: 1, transform: 'translate(-50%, -50%) scale(1)'},
});

const StyledOverlay = styled(AlertDialogPrimitive.Overlay, {
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContent = styled(AlertDialogPrimitive.Content, {
  backgroundColor: '$gray-700',
  border: 'solid 1px $gray-300',
  borderRadius: 6,
  boxShadow: '$overlay',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  '&:focus': {outline: 'none'},
});

function Content({children, ...props}: AlertDialogPrimitive.DialogContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </AlertDialogPrimitive.Portal>
  );
}

const StyledTitle = styled(AlertDialogPrimitive.Title, {
  margin: 0,
  color: 'white',
  fontSize: 17,
  fontWeight: 500,
});

const StyledDescription = styled(AlertDialogPrimitive.Description, {
  marginBottom: 20,
  color: 'white',
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogContent = Content;
const AlertDialogTitle = StyledTitle;
const AlertDialogDescription = StyledDescription;
const AlertDialogAction = AlertDialogPrimitive.Action;

const Alert = ({open, setOpen}: {open: boolean; setOpen: (val: boolean) => void}) => (
  <AlertDialog open={open}>
    <AlertDialogContent>
      <AlertDialogTitle>Thank you for your interest!</AlertDialogTitle>
      <AlertDialogDescription>We will keep you posted.</AlertDialogDescription>
      <Box flex css={{justifyContent: 'flex-end'}}>
        <AlertDialogAction asChild>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </AlertDialogAction>
      </Box>
    </AlertDialogContent>
  </AlertDialog>
);

export {Alert};
