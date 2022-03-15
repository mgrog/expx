import React, {ReactNode} from 'react';
import {NavBar} from '@components/NavBar';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {Box} from '@primitives';

function MainLayout({children}: {children: ReactNode}) {
  const router = useRouter();
  return (
    <>
      <Box css={{position: 'absolute', top: 15, left: 15}}>
        <Image height={50} width={218} src='/logo.png' />
      </Box>
      <NavBar.Position screen={{'@initial': 'mobile', '@bp1': 'desktop'}}>
        <NavBar>
          <NavBar.Item>
            <NavBar.Link active={router.pathname === '/'} href='/'>
              <a>Home</a>
            </NavBar.Link>
          </NavBar.Item>
          <NavBar.Item>
            <NavBar.Link
              active={router.pathname.includes('/users') && !router.pathname.includes('log_in')}
              href='/users/1'>
              Charts
            </NavBar.Link>
          </NavBar.Item>
          <NavBar.Item>
            <NavBar.Link active={router.pathname === '/users/log_in'} href='/users/log_in'>
              <a>Log In</a>
            </NavBar.Link>
          </NavBar.Item>
        </NavBar>
      </NavBar.Position>
      <main>{children}</main>
    </>
  );
}

export {MainLayout};
