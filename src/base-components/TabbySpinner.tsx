import React from 'react';
import {useMemoOne} from 'use-memo-one';
import Animated, {Easing, Clock, Value, timing} from 'react-native-reanimated';

import {Spinner} from './Icons';

interface Props {
  size?: number;
  isRTL?: boolean;
}

const {
  and,
  useCode,
  set,
  block,
  cond,
  startClock,
  clockRunning,
  not,
  interpolate,
  Extrapolate,
} = Animated;

interface LoopProps {
  clock?: Animated.Clock;
  easing?: Animated.EasingFunction;
  duration?: number;
  boomerang?: boolean;
  autoStart?: boolean;
}

export const loop = (loopConfig: LoopProps) => {
  const {clock, easing, duration, boomerang, autoStart} = {
    clock: new Clock(),
    easing: Easing.linear,
    duration: 250,
    boomerang: false,
    autoStart: true,
    ...loopConfig,
  };
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };
  const config = {
    toValue: new Value(1),
    duration,
    easing,
  };

  return block([
    cond(and(not(clockRunning(clock)), autoStart ? 1 : 0), startClock(clock)),
    timing(clock, state, config),
    cond(state.finished, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      boomerang
        ? set(config.toValue, cond(config.toValue, 0, 1))
        : set(state.position, 0),
    ]),
    state.position,
  ]);
};

const TabbySpinner: React.FC<Props> = ({size = 35, isRTL = false}: Props) => {
  const {clock, progress} = useMemoOne(
    () => ({
      clock: new Clock(),
      progress: new Value(0),
    }),
    [],
  );
  const inputRange = [0, 1];
  const outputRange = isRTL ? [0, -2 * Math.PI] : [0, 2 * Math.PI];

  useCode(
    () =>
      block([
        cond(not(clockRunning(clock)), startClock(clock)),
        set(
          progress,
          loop({
            clock,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            autoStart: false,
          }),
        ),
      ]),
    [clock, progress],
  );

  const rotate = interpolate(progress, {
    inputRange,
    outputRange,
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View style={{transform: [{rotate}]}}>
      <Spinner size={size} />
    </Animated.View>
  );
};

export {TabbySpinner};
