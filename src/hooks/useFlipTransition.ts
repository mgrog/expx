import {Lookup} from '@react-spring/types';
import {useEffect} from 'react';
import {config, SpringRef, TransitionFn, useSpringRef, useTransition} from 'react-spring';

function useFlipTransition([index, dir]: [number, 'l' | 'r' | undefined]): [
  TransitionFn<number, any>,
  SpringRef<Lookup<any>>,
] {
  const transRef = useSpringRef();

  useEffect(() => {
    transRef.start();
  }, [index]);

  let enterX;
  switch (dir) {
    case 'l':
      enterX = 'translateX(-50px)';
      break;
    case 'r':
      enterX = 'translateX(50px)';
      break;
    default:
      enterX = 'translateX(0)';
  }

  const transitions = useTransition(index, {
    ref: transRef,
    keys: index,
    from: {opacity: dir ? 0 : 1, transform: enterX},
    enter: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, immediate: true},
    config: {...config.stiff, tension: 400, friction: 35},
  });

  return [transitions, transRef];
}

export {useFlipTransition};
