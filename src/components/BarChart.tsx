import {fetcher} from '@root/fetcher';
import {PoolData} from '@root/pages/api/data.types';
import React, {Fragment, useEffect, useMemo} from 'react';
import {animated, useSpring, useSprings} from 'react-spring';
import useSWR from 'swr';

type Props = {
  height: number;
  width: number;
  maxValue: number;
  selectedPoolIndex: number;
};

function BarChart({height, width, maxValue, selectedPoolIndex}: Props) {
  const {data} = useSWR<PoolData[], any>('/api/fake-pools?', fetcher, {
    suspense: true,
  });

  const selectedPool = data![selectedPoolIndex];
  // space before bars start
  let marginX = 50;
  let baseY = height - 30;

  const getHeight = (value: number) => (value / maxValue) * height;

  const comparedPools = data!.filter((_p, i) => i !== selectedPoolIndex);

  const [animatedStyles, selectedSpring] = useSpring(() => ({
    animatedHeight: 0,
    iconY: baseY + 5,
    baseY: baseY,
  }));

  const [springs, comparedSprings] = useSprings(comparedPools!.length, (_index) => ({
    animatedHeight: 0,
    iconY: baseY + 5,
    baseY: baseY,
  }));

  useEffect(() => {
    selectedSpring.start({
      animatedHeight: getHeight(selectedPool.apy),
      baseY: baseY - getHeight(selectedPool.apy),
      iconY: baseY - getHeight(selectedPool.apy) - 40,
    });

    comparedSprings.start((index) => ({
      animatedHeight: getHeight(comparedPools[index].apy),
      baseY: baseY - getHeight(comparedPools[index].apy),
      iconY: baseY - getHeight(comparedPools[index].apy) - 40,
    }));
    return () => {
      comparedSprings.stop();
    };
  }, [selectedPoolIndex]);

  const barCouple = (comparedPoolIndex: number, baseX: number) => {
    const OFFSET = 40;

    return (
      <Fragment key={comparedPoolIndex}>
        <g>
          <rect fill='#00BFA5' width='20' height='5' x={baseX} y={baseY - 5} />
          <animated.rect
            fill='#00BFA5'
            width='20'
            height={animatedStyles.animatedHeight}
            x={baseX}
            y={animatedStyles.baseY}
            rx='5'
            ry='5'
          />
          <animated.image
            xlinkHref={selectedPool.icon}
            x={baseX - 4}
            y={animatedStyles.iconY}
            width={28}
            height={28}
          />
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
          <animated.image
            xlinkHref={comparedPools[comparedPoolIndex].icon}
            x={baseX + OFFSET - 4}
            y={springs[comparedPoolIndex].iconY}
            width={28}
            height={28}
          />
        </g>
      </Fragment>
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
          comparedPools.map((_pool, i) => {
            return barCouple(i, marginX + i * 150);
          }),
        [comparedPools, selectedPool],
      )}
      <g>
        <line x1='20' y1={baseY} x2={width} y2={baseY} stroke='#304858' />
      </g>
      <g>
        <line x1='30' y1='0' x2='30' y2={baseY + 10} stroke='#304858' />
      </g>
    </svg>
  );
}

export default BarChart;
