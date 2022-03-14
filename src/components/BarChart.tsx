import {fetcher} from '@root/fetcher';
import {PoolData} from '@root/pages/api/data.types';
import {displayPercent} from '@utils/displayPercent';
import React, {Fragment, useEffect, useMemo} from 'react';
import {animated, useSprings} from 'react-spring';
import useSWR from 'swr';

type Props = {
  height: number;
  width: number;
  maxValue: number;
  selectedPoolIndex: number;
};

function BarChart({height, width, maxValue, selectedPoolIndex}: Props) {
  const {data} = useSWR<PoolData[], any>('/api/fake-pools', fetcher, {suspense: true});
  const selectedPool = data![selectedPoolIndex];
  // space before bars start
  let marginX = 50;
  let baseY = height - 30;

  const getHeight = (value: number) => (value / maxValue) * height;

  const [springs, api] = useSprings(data!.length, (_index) => ({
    animatedHeight: 0,
    baseY: baseY,
  }));

  useEffect(() => {
    api.start((index) => ({
      animatedHeight: getHeight(data![index].apy),
      baseY: baseY - getHeight(data![index].apy),
    }));
  }, [selectedPoolIndex]);

  const barCouple = (selectedPoolIndex: number, comparedPoolIndex: number, baseX: number) => {
    const OFFSET = 40;
    // add margin at bottom
    return (
      comparedPoolIndex !== selectedPoolIndex && (
        <Fragment key={comparedPoolIndex}>
          <g>
            <rect fill='#00BFA5' width='20' height='5' x={baseX} y={baseY - 5} />
            <animated.rect
              fill='#00BFA5'
              width='20'
              height={springs[selectedPoolIndex].animatedHeight}
              x={baseX}
              y={springs[selectedPoolIndex].baseY}
              rx='5'
              ry='5'
            />
            {/* TODO: add icon */}
          </g>
          <g>
            <rect fill='#2962FF' width='20' height='5' x={baseX + OFFSET} y={baseY - 5} />
            <animated.rect
              fill='#2962FF'
              width='20'
              height={springs[comparedPoolIndex].animatedHeight}
              x={baseX + OFFSET}
              y={springs[comparedPoolIndex].baseY}
              rx='5'
              ry='5'
            />
            {/* TODO: add icon */}
          </g>
        </Fragment>
      )
    );
  };

  return (
    <svg
      width={width}
      height={height}
      aria-labelledby='title desc'
      role='img'
      style={{backgroundColor: '#141721'}}>
      <title id='title'>A bar chart showing pool information</title>
      {useMemo(
        () =>
          data!.map((pool, i) => {
            return barCouple(selectedPoolIndex, i, marginX + (i ? i - 1 : 0) * 150);
          }),
        [data, selectedPool],
      )}
      <g>
        <line x1='0' y1={baseY} x2={width} y2={baseY} stroke='#304858' />
      </g>
      <g>
        <line x1='30' y1='0' x2='30' y2={height} stroke='#304858' />
      </g>
    </svg>
  );
}

export default BarChart;
