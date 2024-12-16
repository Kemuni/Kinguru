"use client"

import React, {HTMLAttributes, useState} from "react";
import {SwipeEventData, useSwipeable} from "react-swipeable";


export type SwipeCallback = (eventData: SwipeEventData) => void;
export type CanSwipeCallback = () => boolean;

interface SwipeWrapperProps extends HTMLAttributes<HTMLDivElement> {
  canSwipeLeft?: CanSwipeCallback | undefined,
  canSwipeRight?: CanSwipeCallback | undefined,
  maxRotateDegree?: number | undefined,
  minDeltaTODispatch?: number | undefined,
  useColorLight?: boolean | undefined,
  onLeftSwipe?: SwipeCallback | undefined,
  onRightSwipe?: SwipeCallback | undefined,
}

const SwipeCardWrapper: React.FC<SwipeWrapperProps> = (
  {
    useColorLight = false,
    canSwipeLeft = () => true,
    canSwipeRight = () => true,
    onLeftSwipe = undefined,
    onRightSwipe = undefined,
    maxRotateDegree = 25,
    minDeltaTODispatch = 165,
    className, style, children
  }
) =>
{
  const [ cardDegree, setCardDegree ] = useState<number>(0);

  function handleLeftSlide(e: SwipeEventData) {
    if (onLeftSwipe && canSwipeLeft() && e.absX >= minDeltaTODispatch)
      onLeftSwipe(e);
  }

  function handleRightSlide(e: SwipeEventData) {
    if (onRightSwipe && canSwipeRight() && e.absX >= minDeltaTODispatch)
      onRightSwipe(e)
  }

  function handleSwiping(e: SwipeEventData) {
    const degree: number = Math.min(Math.ceil(e.absX / 15), maxRotateDegree);
    if (e.dir == "Right") {
      if (canSwipeRight()) setCardDegree(degree);
    }
    else if (canSwipeLeft()) setCardDegree(-1 * degree);
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleLeftSlide,
    onSwipedRight: handleRightSlide,
    onSwiped: () => setCardDegree(0),
    onSwiping: handleSwiping,
    delta: 1,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const swipeStyles = {
    transform: `
    translate(${cardDegree / 3}px, ${Math.abs(cardDegree) / 5}px) 
    rotate(${cardDegree / maxRotateDegree}deg)
  `,
    boxShadow: "",
  }
  if (useColorLight)
    swipeStyles.boxShadow = `${cardDegree < 0 ? "-" : ""}3px ${cardDegree < 0 ? "-" : ""}3px 15px 0px
    color-mix(
      in srgb,
      ${cardDegree > 0 ? "#177e17" : "#5d1a1a"},
      transparent ${100 - Math.abs(cardDegree) / maxRotateDegree * 100}%
    )`;

  return (
    <div
      {...swipeHandlers}
      className={className}
      style={Object.assign({}, swipeStyles, style)}
    >
      { children }
    </div>
  );
}

export default SwipeCardWrapper;

