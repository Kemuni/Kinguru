"use client"

import {Button} from "@/components/Button";
import Image from "next/image";
import CancelIco from "@/public/static/icons/cancel.svg";
import HeartIco from "@/public/static/icons/heart.svg";
import React, {FC, useEffect, useReducer, useState} from "react";
import {useGetRandomMovieListItems} from "@/hooks/movie";
import {Movie} from "@/types/Movie";
import {MovieCardInfo} from "@/components/MovieCardInfo";
import {useRouter} from "next/navigation";
import {SwipeEventData, useSwipeable} from "react-swipeable";


enum MovieActionType {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}


interface MovieAction {
  type: MovieActionType
  movieId: number
}


interface MovieState {
  movieIndex: number
  likedIds: number[]
  dislikedIds: number[]
}

function movieReducer(state: MovieState, action: MovieAction) {
  const { type, movieId } = action;
  switch (type) {
    case MovieActionType.LIKE:
      const newLikedIds = [...state.likedIds, movieId]
      return {
        ...state,
        movieIndex: state.movieIndex + 1,
        likedIds: newLikedIds,
      }
    case MovieActionType.DISLIKE:
      const newDislikedIds = [...state.dislikedIds, movieId];
      return {
        ...state,
        movieIndex: state.movieIndex + 1,
        dislikedIds: newDislikedIds,
      }
    default:
      throw Error('Unknown action: ' + type);
  }
}


export const MovieRateCard: FC = () => {
  const { movies, isLoading} = useGetRandomMovieListItems();
  const [ currentMovie, setCurrentMovie ] = useState<Movie>(movies[0]);
  const [ movieState, movieDispatch ] = useReducer(
    movieReducer, { movieIndex: 0, likedIds: [], dislikedIds: [] }
  );
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading && movies.length != 0)
      setCurrentMovie(movies[movieState.movieIndex]);
  }, [movieState, movies, isLoading]);

  function handleRateClick(type: MovieActionType) {
    if (movieState.movieIndex + 2 > movies.length) {
      const queryParams = new URLSearchParams({
        likedMovies: JSON.stringify(movieState.likedIds),
        dislikedMovies: JSON.stringify(movieState.dislikedIds),
      });
      push(`/survey/results/?${queryParams.toString()}`);
    }
    else movieDispatch({ type: type, movieId: currentMovie.id })
  }

  const [ cardDegree, setCardDegree ] = useState<number>(0);
  const MAX_CARD_DEGREE: number = 25, MIN_DELTA_TO_DISPATCH: number = 165;

  function handleLeftSlide(e: SwipeEventData) {
    if (e.absX >= MIN_DELTA_TO_DISPATCH) {
      console.log(e.absX);
      handleRateClick(MovieActionType.DISLIKE)
    }
  }

  function handleRightSlide(e: SwipeEventData) {
    if (e.absX >= MIN_DELTA_TO_DISPATCH)
      handleRateClick(MovieActionType.LIKE)
  }

  function handleSwiping(e: SwipeEventData) {
    let degree: number = Math.min(Math.ceil(e.absX / 15), MAX_CARD_DEGREE);
    setCardDegree(degree * (e.dir == "Right" ? 1 : -1));
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
      rotate(${cardDegree / MAX_CARD_DEGREE}deg)
    `,
    boxShadow:
      `${cardDegree < 0 ? "-" : ""}3px ${cardDegree < 0 ? "-" : ""}3px 15px 0px
      color-mix(
        in srgb,
        ${cardDegree > 0 ? "#177e17" : "#5d1a1a"},
        transparent ${100 - Math.abs(cardDegree) / MAX_CARD_DEGREE * 100}%
      )`,
  }

  return (
    <div {...swipeHandlers} className="w-full h-full overflow-visible">
      <div
        style={swipeStyles}
        className="bg-[var(--native-bg-color)] rounded-t-3xl w-full h-full flex flex-col justify-between
          items-center gap-2 py-4 px-3 ring-2 ring-[var(--native-secondary-bg-color)] transition-transform">
        <h2 className="text-left w-full font-[family-name:var(--font-subheader)] text-xl">
          Оцените фильмы: {movieState.movieIndex + 1}/{movies.length == 0 ? 10 : movies.length}
        </h2>
        <div className="w-full flex-grow px-2 lg:px-3 overflow-hidden">
          <MovieCardInfo movie={currentMovie}/>
        </div>
        <div className="h-fit w-full flex-shrink-0">
          <div className="flex flex-row justify-around mb-4 lg:mb-0">
            <Button
              variant="secondary_dark" size="icon_auto" className="rounded-full p-2 drop-shadow-md"
              onClick={() => handleRateClick(MovieActionType.DISLIKE)}
            >
              <Image width={58} height={58} src={CancelIco} alt="Back"/>
            </Button>
            <Button
              variant="secondary_dark" size="icon_auto" className="rounded-full p-2 drop-shadow-md"
              onClick={() => handleRateClick(MovieActionType.LIKE)}
            >
              <Image width={58} height={58} src={HeartIco} alt="Back"/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
