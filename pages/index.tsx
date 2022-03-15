import {SplashLayout} from '@components/SplashLayout';
import {Box, Button, Input, Text} from '@primitives';
import type {NextPage} from 'next';

const Home: NextPage = () => {
  return (
    <>
      <SplashLayout>
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            mx: 20,
          }}>
          <Text as='h1' color={{'@initial': 'dark', '@bp2': 'light'}} css={{fontSize: '$4'}}>
            DeFi
          </Text>
          <Text as='h1' css={{color: '$periwinkle', fontSize: '$4'}}>
            DemystiFied
          </Text>
          <Text css={{color: '$gray-700', fontSize: '$3'}}>Coming Soon</Text>
        </Box>
      </SplashLayout>
      <Box
        css={{
          display: 'flex',
          position: 'absolute',
          width: '100%',
          height: '35px',
          bottom: 150,
          marginLeft: 15,
          justifyContent: 'center',
          '@bp2': {
            bottom: 50,
            justifyContent: 'stretch',
          },
        }}>
        <Input placeholder='enter your email' css={{width: '50vw', radRight: 0}} />
        <Button css={{fontSize: '$2', height: '100%', radLeft: 0}}>Be informed</Button>
      </Box>
    </>
  );
};

export default Home;
