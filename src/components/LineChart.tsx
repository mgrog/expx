import ChartInfo from '@components/ChartInfo';
import {Box, Text} from '@elements';
import {fetcher} from '@root/fetcher';
import {ExtendedPoolDataWithSeries} from '@root/pages/api/data.types';
import {selectedPoolApyAtom} from '@root/src/atoms';
import {parseISO} from 'date-fns';
import format from 'date-fns/format';
import {useAtom} from 'jotai';
import React, {Fragment, useMemo} from 'react';
import useSWR from 'swr';

type Props = {
  width: number;
  height: number;
  maxValue: number;
  selectedPoolIndex: number;
  numDataPoints?: number;
};

function LineChart({width, height, maxValue, selectedPoolIndex, numDataPoints = 30}: Props) {
  const [currentApy] = useAtom(selectedPoolApyAtom);
  const {data} = useSWR<ExtendedPoolDataWithSeries>(
    `/api/fake-pools/${selectedPoolIndex}`,
    fetcher,
    {
      suspense: true,
    },
  );

  let dataPoints = data!.series.slice(-numDataPoints);

  const MARGIN_X = 0;
  const MARGIN_BOTTOM = 50;

  const getHeight = (value: number | string) => {
    let val = typeof value === 'string' ? parseFloat(value) : value;
    return height - MARGIN_BOTTOM - (val / maxValue) * height;
  };

  let widthInc = (width - MARGIN_X - 5) / (dataPoints.length - 1);

  let points = dataPoints.reduce((acc, dp, index) => {
    return acc + `${5 + widthInc * index},${getHeight(dp.apy)} `;
  }, '');

  return (
    <>
      <Box flex css={{gap: 20, alignItems: 'flex-end'}}>
        <Text padded>Apy over time</Text>
        <Text as='h4' padded css={{fontWeight: '500', '& b': {color: '$green'}}}>
          <>
            Current Rate: <b>{currentApy}</b>
          </>
        </Text>
      </Box>
      <svg width={width} height={height} style={{backgroundColor: '#141721'}}>
        <polyline fill='none' stroke='#0074d9' strokeWidth='3' points={points} />
        <polygon
          fill='#0074d9'
          fillOpacity={0.2}
          strokeWidth='0'
          points={`5,${height - MARGIN_BOTTOM} ${points} ${width},${height - MARGIN_BOTTOM}`}
        />
        <g>
          <rect x={0} y={0} width={5} height={height} fill={'#304858'} />
        </g>
        {/* <g>
        <rect x={width - MARGIN_X} y={0} width={MARGIN_X} height={height} fill={'#304858'} />
      </g>
      <g>
        <text
          x={width - MARGIN_X}
          y={getHeight(data!.apy)}
          dx={'0.5em'}
          dy={'-1em'}
          fill='#00BFA5'
          style={{fontWeight: 600}}>
          {displayPercent(data!.apy, 1)}
        </text>
      </g> */}
        {useMemo(
          () =>
            points.split(' ').map((pt: string, i) => {
              let [x, y] = pt.split(',');
              return (
                <Fragment key={i}>
                  <g>
                    <ChartInfo data={dataPoints[i]}>
                      <circle cx={x} cy={y} r={4} fill='#0074d9' />
                    </ChartInfo>
                  </g>
                  {dataPoints[i] && i % 3 === 0 && (
                    <>
                      <g>
                        <text
                          textAnchor='start'
                          x={parseInt(x) - 20}
                          y={height - MARGIN_BOTTOM + 5}
                          fill='#FFF'
                          style={{fontWeight: 300, fontSize: '0.7em'}}
                          transform={`rotate(25, ${parseInt(x) - 20}, ${height})`}>
                          {format(parseISO(dataPoints[i].date), 'MM/dd/yy')}
                        </text>
                      </g>
                      <g>
                        <line
                          x1={x}
                          y1={height - MARGIN_BOTTOM * 1.25}
                          x2={x}
                          y2={height - MARGIN_BOTTOM}
                          stroke='#304858'
                        />
                      </g>
                    </>
                  )}
                </Fragment>
              );
            }),
          [points],
        )}
        <g>
          <line
            x1='0'
            y1={height - MARGIN_BOTTOM}
            x2={width}
            y2={height - MARGIN_BOTTOM}
            stroke='#304858'
          />
        </g>
      </svg>
    </>
  );
}

export default LineChart;
