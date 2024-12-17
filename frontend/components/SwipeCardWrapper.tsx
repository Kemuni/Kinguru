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
    maxRotateDegree = 3,
    minDeltaTODispatch = 110,
    className, style, children
  }
) =>
{
  const [ cardDegree, setCardDegree ] = useState<number>(0);

  function handleLeftSlide(e: SwipeEventData) {
    setCardDegree(0);
    if (onLeftSwipe && canSwipeLeft() && e.absX >= minDeltaTODispatch)
      onLeftSwipe(e);
  }

  function handleRightSlide(e: SwipeEventData) {
    setCardDegree(0);
    if (onRightSwipe && canSwipeRight() && e.absX >= minDeltaTODispatch)
      onRightSwipe(e)
  }

  function handleSwiping(e: SwipeEventData) {
    console.log("SWIPING")
    if (e.absX < 15) return;
    const degree: number = Math.min(Math.ceil(e.absX / 40), maxRotateDegree);
    if (e.dir == "Right") {
      if (canSwipeRight()) setCardDegree(degree);
    }
    else if (canSwipeLeft()) setCardDegree(-1 * degree);
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleLeftSlide,
    onSwipedRight: handleRightSlide,
    onSwiped: () => setCardDegree(0),
    onTouchEndOrOnMouseUp: () => setCardDegree(0),
    onSwiping: handleSwiping,
    delta: 1,
    trackMouse: true,
  });

  const swipeStyles = {
    transition: "0.1s",
    transform: `
    translate(${cardDegree}px, ${Math.abs(cardDegree)}px) 
    rotate(${cardDegree}deg)
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

