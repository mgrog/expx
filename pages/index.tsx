import {Alert} from '@components/Alert';
import {SplashLayout} from '@components/SplashLayout';
import {Box, Button, Error, Input, Text} from '@elements';
import type {NextPage} from 'next';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <SplashLayout>
        <Box
          flex
          col
          centered='horizontal'
          css={{gap: 10, marginRight: 20, '@bp2': {alignItems: 'flex-start', marginLeft: 20}}}>
          <Text as='h1' color={{'@initial': 'dark', '@bp2': 'light'}} css={{fontSize: '$4'}}>
            DeFi
          </Text>
          <Text as='h1' css={{color: '$periwinkle', fontSize: '$4'}}>
            DemystiFied
          </Text>
          <Text css={{color: '$gray-700', fontSize: '$3'}}>Coming Soon</Text>
          <form onSubmit={handleSubmit(() => setDialogOpen(true))}>
            <Box flex css={{marginTop: '20vh', height: 35, justifyContent: 'stretch'}}>
              <Box>
                <Input
                  placeholder='enter your email'
                  css={{width: '50vw', maxWidth: 400, radRight: 0, '@bp2': {height: 45}}}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value:
                        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                      message: 'Must be a valid email',
                    },
                  })}
                />
                <Error visible={!!errors.email}>{errors.email?.message}</Error>
              </Box>
              <Button css={{fontSize: '$2', height: 35, radLeft: 0, '@bp2': {height: 45}}}>
                Be informed
              </Button>
            </Box>
          </form>
        </Box>
        <Alert open={dialogOpen} setOpen={setDialogOpen} />
      </SplashLayout>
    </>
  );
};

export default Home;
