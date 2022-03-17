import React, {ReactNode} from 'react';
import {NavBar} from '@components/NavBar';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {Box, Text} from '@elements';
import {userAtom} from '@root/src/atoms';
import Cookies from 'js-cookie';
import {useAtom, useSetAtom} from 'jotai';

function MainLayout({children}: {children: ReactNode}) {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const setUser = useSetAtom(userAtom);

  const logOut = () => {
    setUser(null);
    Cookies.remove('auth_token');
  };

  return (
    <>
      <Box css={{position: 'absolute', top: 15, left: 15, paddingBottom: 60}}>
        <Box flex css={{gap: 30}}>
          <Image height={50} width={218} src='/logo.png' />
          {user && (
            <Text as='h4' css={{textTransform: 'capitalize', marginTop: 10}}>
              {user.username}
            </Text>
          )}
        </Box>
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
              href='/protected/users/5301'>
              Charts
            </NavBar.Link>
          </NavBar.Item>
          <NavBar.Item>
            {!user ? (
              <NavBar.Link active={router.pathname === '/users/log_in'} href='/users/log_in'>
                <a>Log In</a>
              </NavBar.Link>
            ) : (
              <NavBar.Link active={router.pathname === '/users/log_out'} href='/'>
                <a onClick={() => logOut()}>Log Out</a>
              </NavBar.Link>
            )}
          </NavBar.Item>
        </NavBar>
      </NavBar.Position>
      <main>
        <Box css={{paddingBottom: 60, '@bp1': {paddingBottom: 0}}}>{children}</Box>
      </main>
    </>
  );
}

export {MainLayout};
