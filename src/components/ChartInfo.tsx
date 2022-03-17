import {Box, Separator, Text} from '@elements';
import {displayPercent} from '@lib/utils';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import {SeriesDataPoint} from '@root/pages/api/data.types';
import {styled} from '@root/stitches.config';
import {parseISO} from 'date-fns';
import format from 'date-fns/format';
import React from 'react';

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;
const HoverCardContent = styled(HoverCardPrimitive.Content, {
  border: 'solid 2px $gray-700',
  borderRadius: 10,
  padding: 10,
  paddingBottom: 20,
  width: 260,
  backgroundColor: '$gray-800',
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
        <Box flex css={{justifyContent: 'space-between'}}>
          <Text as='h4' css={{marginTop: 0, marginBottom: 10}}>
            Details
          </Text>
          {data?.date && (
            <Text as='h5' css={{fontSize: '0.75em', fontWeight: 300}}>
              {format(parseISO(data.date), 'MM/dd/yyyy')}
            </Text>
          )}
        </Box>
        <Box flex col>
          <Box flex css={{alignItems: 'center', height: 100}}>
            <Box flex col centered grow>
              <Text as='label' css={{marginBottom: 15, fontWeight: 700}}>
                Apy
              </Text>
              <Text as='p' css={{color: '$green'}}>
                {displayPercent(data?.apy, 1)}
              </Text>
            </Box>
            <Separator decorative orientation='vertical' css={{margin: '0 15px'}} />
            <Box flex col centered grow>
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
