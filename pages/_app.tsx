import {MainLayout} from '@components/MainLayout';
import {fetchUserAtom} from '@root/src/atoms';
import {useAtom} from 'jotai';
import Cookies from 'js-cookie';
import type {AppProps} from 'next/app';
import {useEffect} from 'react';
import '../styles/globals.css';

function MyApp({Component, pageProps}: AppProps) {
  const [, fetchUser] = useAtom(fetchUserAtom);

  // load user if signed in
  useEffect(() => {
    let token = Cookies.get('auth_token');
    if (token) fetchUser();
  }, []);

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
