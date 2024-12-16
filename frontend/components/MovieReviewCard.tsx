"use client"

import {Button} from "@/components/Button";
import Image from "next/image";
import React, {FC, useEffect, useState} from "react";
import {useGetRecommendationMovieListItems} from "@/hooks/movie";
import {Movie} from "@/types/Movie";
import {MovieCardInfo} from "@/components/MovieCardInfo";
import ChevronIco from "@/public/static/icons/chevron.svg";
import SwipeCardWrapper from "@/components/SwipeCardWrapper";


enum MovieActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

interface MovieReviewCardProps {
  likedMovies: number[],
  dislikedMovies: number[],
}


export const MovieReviewCard: FC<MovieReviewCardProps> = ({ likedMovies, dislikedMovies}) => {
  const { movies, isLoading} = useGetRecommendationMovieListItems(likedMovies, dislikedMovies);
  const [ currentMovie, setCurrentMovie ] = useState<Movie>(movies[0]);
  const [ currentMovieId, setCurrentMovieID ] = useState<number>(0);

  useEffect(() => {
    if (!isLoading && movies.length != 0)
      setCurrentMovie(movies[currentMovieId]);
  }, [currentMovieId, movies, isLoading]);

  function handleButtonClick(type: MovieActionType) {
    switch (type) {
      case MovieActionType.INCREMENT:
        if (currentMovieId + 1 < movies.length) setCurrentMovieID(currentMovieId+1);
        break;
      case MovieActionType.DECREMENT:
        if (currentMovieId > 0) setCurrentMovieID(currentMovieId-1);
        break;
    }
  }

  return (
    <>
      <SwipeCardWrapper
        className="w-full h-full rounded-t-3xl"
        canSwipeLeft={() => currentMovieId > 0}
        onLeftSwipe={() => handleButtonClick(MovieActionType.DECREMENT)}
        onRightSwipe={() => handleButtonClick(MovieActionType.INCREMENT)}
        canSwipeRight={() => currentMovieId + 1 < movies.length}
      >
        <div
          className="bg-[var(--native-bg-color)] rounded-t-3xl w-full h-full flex flex-col justify-between
            items-center gap-2 py-4 px-3 ring-2 ring-[var(--native-secondary-bg-color)]">
          <h2 className="text-left w-full font-[family-name:var(--font-subheader)] text-xl">
            Рекомендуем вам: {currentMovieId + 1}/{movies.length == 0 ? 10 : movies.length}
          </h2>
          <div className="w-full flex-grow px-2 lg:px-3 overflow-hidden">
            <MovieCardInfo movie={currentMovie}/>
          </div>
          <div className="h-fit w-full flex-shrink-0">
            <div className="flex flex-row justify-around mb-4 lg:mb-0">
              <Button
                variant="secondary_dark" size="icon_auto" className="rounded-full p-2 drop-shadow-md"
                onClick={() => handleButtonClick(MovieActionType.DECREMENT)}
                disabled={currentMovieId == 0}
              >
                <Image width={58} height={58} src={ChevronIco} alt="Back"/>
              </Button>
              <Button
                variant="secondary_dark" size="icon_auto" className="rounded-full p-2 drop-shadow-md"
                onClick={() => handleButtonClick(MovieActionType.INCREMENT)}
                disabled={currentMovieId == movies.length - 1}
              >
                <Image width={58} height={58} src={ChevronIco} className="rotate-180" alt="Next"/>
              </Button>
            </div>
          </div>
        </div>
      </SwipeCardWrapper>
    </>
  );
}
