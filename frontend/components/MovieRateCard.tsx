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

  return (
    <div
      className="bg-[var(--native-bg-color)] rounded-t-3xl w-full h-full flex flex-col justify-between
        items-center gap-2 py-4 px-3 ring-2 ring-[var(--native-secondary-bg-color)]">
      <div className="w-full flex-grow overflow-hidden lg:px-3">
        <MovieCardInfo movie={currentMovie} />
      </div>
      <div className="h-fit w-full flex-shrink-0">
        <div className="flex flex-row justify-around mb-4">
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
  );
}
