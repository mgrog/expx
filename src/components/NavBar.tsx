import {Separator} from '@elements';
import * as NavBarPrimitive from '@radix-ui/react-navigation-menu';
import {styled} from '@root/stitches.config';
import Link, {LinkProps} from 'next/link';
import React, {Fragment, ReactNode} from 'react';

export {NavBar};

const StyledMenu = styled(NavBarPrimitive.Root, {
  zIndex: 1000,
  height: 60,
});

const StyledList = styled(NavBarPrimitive.List, {
  all: 'unset',
  display: 'flex',
  backgroundColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  listStyle: 'none',
  height: '100%',
});

const StyledIndicator = styled(NavBarPrimitive.Link, {
  backgroundColor: 'white',

  '&[data-orientation="horizontal"]': {height: 3},
  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'width, transform, 250ms ease',
  },
});

const itemStyles = {
  padding: '12px 20px',
  outline: 'none',
  userSelect: 'none',
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  color: 'white',
  '&:focus': {position: 'relative', boxShadow: `0 0 0 2px #000`},
  '&:hover': {filter: 'brightness(110%)'},
};

const StyledLink = styled('div', {
  ...itemStyles,
  display: 'block',
  textDecoration: 'none',
  fontSize: 15,
  lineHeight: 1,
  cursor: 'pointer',

  variants: {
    active: {
      true: {
        color: '$periwinkle',
      },
    },
  },
});

const StyledItem = styled(NavBarPrimitive.Item, {});

const StyledNavPosition = styled('div', {
  height: 50,
  variants: {
    screen: {
      desktop: {
        position: 'absolute',
        top: 10,
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100vw',
        paddingRight: 20,

        [`& ${StyledList}`]: {
          backgroundColor: 'transparent',
        },
      },
      mobile: {
        position: 'fixed',
        bottom: 0,
        width: '100vw',

        [`& ${StyledList}`]: {
          borderRadius: 0,
          backgroundColor: '$violet-800',
          height: 60,
        },
      },
    },
  },
});

const NavBar = ({children}: {children: JSX.Element[]}) => (
  <StyledMenu>
    <StyledList>
      {children.map((elem: JSX.Element, i) => (
        <Fragment key={i}>
          {elem}
          {i !== children.length - 1 && (
            <Separator orientation='vertical' css={{height: '20px !important', margin: '0 3px'}} />
          )}
        </Fragment>
      ))}

      <StyledIndicator />
    </StyledList>
  </StyledMenu>
);

NavBar.Position = StyledNavPosition;
NavBar.List = StyledList;
NavBar.Item = StyledItem;
// fix warning about forwarded ref
const MyLink = React.forwardRef((props: LinkProps, forwardedRef) => <Link {...props} />);

type NavbarLinkProps = {
  children: ReactNode;
  active?: boolean;
} & LinkProps;

NavBar.Link = ({children, active, ...props}: NavbarLinkProps) => {
  return (
    <NavBarPrimitive.Link asChild>
      <MyLink {...props}>
        <StyledLink active={active}>{children}</StyledLink>
      </MyLink>
    </NavBarPrimitive.Link>
  );
};
