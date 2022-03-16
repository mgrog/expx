import {SplashLayout} from '@components/SplashLayout';
import {Box, Button, Card, Error, Input, Text} from '@elements';
import {userAtom} from '@root/src/atoms';
import {useAtom, useSetAtom} from 'jotai';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';
import React from 'react';
import {useForm} from 'react-hook-form';

function LogIn() {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const setUser = useSetAtom(userAtom);

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm();

  const onSubmit = async (body: {[k: string]: string}) => {
    fetch('/api/users/log_in', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(async (response) => {
      if (response.ok) {
        let resp = await response.json();
        Cookies.set('auth_token', 'someval');
        setUser(resp);
        router.push('/protected/users/5301');
      } else {
        let data = await response.json();
        setError('apiError', {type: 'manual', message: data.message});
      }
    });
  };

  return (
    <SplashLayout>
      <Box flex w-full centered>
        <Card css={{px: 50, height: '100%', marginTop: 20}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box flex col css={{gap: 30}}>
              <Text family='alternate'>Log In</Text>
              <Box>
                <Input
                  placeholder='enter username'
                  {...register('username', {required: 'Username is required'})}
                />
                <Error visible={!!errors?.username}>{errors.username?.message}</Error>
              </Box>
              <Box>
                <Input
                  placeholder='enter password'
                  {...register('password', {required: 'Password is required'})}
                />
                <Error visible={!!errors?.password}>{errors.password?.message}</Error>
              </Box>
              <Button size='large' css={{width: 150, alignSelf: 'flex-end'}}>
                Log In
              </Button>
            </Box>
          </form>
          <Error visible={!!errors.apiError}>Error: {errors.apiError?.message}</Error>
        </Card>
      </Box>
    </SplashLayout>
  );
}

export default LogIn;
