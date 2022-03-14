import ChartInfo from '@components/ChartInfo';
import {fetcher} from '@root/fetcher';
import {ExtendedPoolDataWithSeries, SeriesDataPoint} from '@root/pages/api/data.types';
import {displayPercent} from '@utils/displayPercent';
import React, {RefObject, useRef, useState} from 'react';
import useSWR from 'swr';

type Props = {
  width: number;
  height: number;
  maxValue: number;
  url: string;
};

function LineChart({width, height, maxValue, url}: Props) {
  const {data} = useSWR<ExtendedPoolDataWithSeries>(url, fetcher, {
    suspense: true,
  });
  let dataPoints = data!.series.slice(0, 20);

  const MARGIN_X = 60;
  const MARGIN_BOTTOM = 60;

  const [infoOpen, setInfoOpen] = useState(false);

  const getHeight = (value: number | string) => {
    let val = typeof value === 'string' ? parseFloat(value) : value;
    return height - (val / maxValue) * height;
  };

  let widthInc = (width - MARGIN_X - 5) / (dataPoints.length - 1);

  let points = dataPoints.reduce((acc, dp, index) => {
    return acc + `${5 + widthInc * index},${getHeight(dp.apy)} `;
  }, '');

  return (
    <>
      <svg width={width} height={height} style={{backgroundColor: '#141721'}}>
        {/* <title id='title'>A line chart showing apy over time</title> */}
        <polyline fill='none' stroke='#0074d9' strokeWidth='3' points={points} />
        <polygon
          fill='#0074d9'
          fillOpacity={0.2}
          strokeWidth='0'
          points={`5,${height} ${points} ${width},${height}`}
        />
        <g>
          <rect x={0} y={0} width={5} height={height} fill={'#304858'} />
        </g>
        <g>
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
        </g>
        <g>
          {points.split(' ').map((pt: string, i) => {
            let [x, y] = pt.split(',');
            return (
              <ChartInfo key={`info_${i}`} data={dataPoints[i]}>
                <circle key={i} cx={x} cy={y} r={4} fill='#0074d9' />
              </ChartInfo>
            );
          })}
        </g>
      </svg>
      {/* <ChartInfo open={infoOpen} anchorRef={anchorRef} /> */}
    </>
  );
}

export default LineChart;
