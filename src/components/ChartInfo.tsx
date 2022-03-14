import {Box, Separator, Text} from '@primitives';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import {SeriesDataPoint} from '@root/pages/api/data.types';
import {keyframes, styled} from '@root/stitches.config';
import {displayPercent} from '@utils/displayPercent';
import React from 'react';
import format from 'date-fns/format';
import {parseISO} from 'date-fns';

const slideDown = keyframes({
  '0%': {opacity: 0, transform: 'translateY(-10px)'},
  '100%': {opacity: 1, transform: 'translateY(0)'},
});

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;
const HoverCardContent = styled(HoverCardPrimitive.Content, {
  border: 'solid 2px $gray-700',
  borderRadius: 10,
  padding: 10,
  paddingBottom: 20,
  width: 260,
  backgroundColor: '$gray-800',
  // transformOrigin: 'var(--radix-hover-card-content-transform-origin)',
  // animation: `${slideDown} 0.1s ease-out forwards`,
});

const HoverCardArrow = styled(HoverCardPrimitive.Arrow, {
  fill: '$gray-700',
});

type Props = {
  data?: SeriesDataPoint;
} & HoverCardPrimitive.HoverCardProps;

function ChartInfo({data, children, ...props}: Props) {
  return (
    <HoverCard {...props} openDelay={100} closeDelay={0}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent>
        <Box css={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
          <Text as='h4' css={{marginTop: 0, marginBottom: 10}}>
            Details
          </Text>
          {data?.date && (
            <Text as='h5' css={{fontSize: '0.75em', fontWeight: 300}}>
              {format(parseISO(data.date), 'MM/dd/yyyy')}
            </Text>
          )}
        </Box>
        <Box css={{display: 'flex', flexDirection: 'column'}}>
          <Box css={{display: 'flex', alignItems: 'center', height: 100}}>
            <Box
              css={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text as='label' css={{marginBottom: 15, fontWeight: 700}}>
                Apy
              </Text>
              <Text as='p' css={{color: '$green'}}>
                {displayPercent(data?.apy, 1)}
              </Text>
            </Box>
            <Separator decorative orientation='vertical' css={{margin: '0 15px'}} />
            <Box
              css={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text as='label' css={{marginBottom: 15, fontWeight: 700}}>
                TVL
              </Text>
              <Text as='p' css={{fontWeight: 300}}>
                {data?.tvl}
              </Text>
            </Box>
          </Box>
        </Box>
        <HoverCardArrow />
      </HoverCardContent>
    </HoverCard>
  );
}

export default ChartInfo;
