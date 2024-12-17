"use client"

import Image from "next/image";
import {Button} from "@/components/Button";
import PosterPlaceholder from "@/public/static/images/poster_loading_placeholder.png";
import React, {FC, useEffect, useState} from "react";
import {Movie} from "@/types/Movie";
import {APIEndpointsUrls, baseURL} from "@/services/api-urls";
import Link from "next/link";


interface MovieCardInfoCatalogProps {
  movie: Movie | undefined
}


export const MovieCardInfoCatalog: FC<MovieCardInfoCatalogProps> = ({ movie }) => {
  const [ isPosterLoading, setPosterLoading ] = useState<boolean>(true);


  useEffect(() => {
    setPosterLoading(true);
  }, [movie])

  if (movie === undefined) return <MovieCardSkeleton/>
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-0.5 w-full h-full top-0 bottom-0 left-0 bg-[var(--native-secondary-bg-color)] py-1.5 px-1 rounded-xl"
           style={{scrollbarWidth: "none"}}
      >
        <div className="relative w-full flex-grow max-h-[27dvh] sm:max-h-[25dvh] h-[27dvh] sm:h-[25dvh] aspect-2/3">
          <Image fill
                 sizes="100%"
                 className="object-cover rounded-xl"
                 style={isPosterLoading ? {display: "none"} : {}}
                 onLoad={() => setPosterLoading(false)}
                 src={`${baseURL}/${APIEndpointsUrls.MoviePoster}${movie.image_path}`}
                 priority={true}
                 alt="Content image"/>
          {
            isPosterLoading
              ? <Image fill
                       sizes="100%"
                       className="object-cover rounded-xl asp"
                       src={PosterPlaceholder}
                       alt="Content image"/>
              : null
          }
          <span className="text-[var(--native-text-color)] font-[family-name:var(--font-subheader)] bg-[var(--native-focus-color)] rounded-lg px-1 text-sm top-1.5 right-1.5 absolute">
              {
                movie.ratings.find(rating => rating.source === "imdb")?.vote_average.toFixed(1)
                ?? movie.ratings[0]?.vote_average.toFixed(1)
              }
          </span>
        </div>
        <div
          className="flex flex-row justify-between w-full px-2 text-sm font-[family-name:var(--font-text)]
                      text-[var(--native-hint-color)]">
          <div className="flex gap-2">
            <span>
              {movie.release_date.slice(0, 4)}
            </span>
          </div>
          <div className="flex">
            {`${Math.floor(movie.duration / 60)} ч `}
            {movie.duration % 60 != 0 && `${movie.duration % 60}м`}
          </div>
        </div>
        <span
          className="text-left w-full font-[family-name:var(--font-subheader)] text-base"
        >
          {movie.ru_title}
        </span>
        <div className="flex flex-row flex-wrap justify-start items-start w-full gap-2
                            font-[family-name:var(--font-text)] text-[var(--native-hint-color)] text-sm">
          {
            movie.genres.join(", ")
          }
        </div>
        <div className="mt-auto">
          <Link className="flex flex-col items-center justify-center pt-4" href={``}>
            <Button variant="dark" size="catalog">Перейти</Button>
          </Link>
        </div>
      </div>
    </div>

  )
}


const MovieCardSkeleton: FC = () => {
  return (
    <div className="min-h-full w-full">
      <div className="flex flex-col gap-2 w-full h-full animate-pulse bg-[var(--native-secondary-bg-color)] py-1.5 px-1 rounded-xl">
        <div className="relative w-full flex-grow max-h-[27dvh] sm:max-h-[25dvh] aspect-2/3">
          <Image fill
                 sizes="100%"
                 className="object-cover rounded-xl"
                 src={PosterPlaceholder}
                 alt="Content image"/>
          <span className="text-[var(--additional-green)] font-[family-name:var(--font-subheader)] font-bold top-3 right-3 absolute">
              <div className="h-5 bg-gray-500 rounded w-6"></div>
          </span>
        </div>
        <div
          className="flex flex-row justify-between w-full px-2 text-sm font-[family-name:var(--font-text)]
                      text-[var(--native-hint-color)]">
        <div className="flex gap-2">
            <span>
              <div className="h-3 bg-gray-500 rounded w-12"></div>
            </span>
          </div>
          <div className="flex">
            <div className="h-3 bg-gray-500 rounded w-16"></div>
          </div>
        </div>
        <span
          className="text-left w-full font-[family-name:var(--font-subheader)] text-3xl"
        >
          <div className="h-5 bg-gray-500 rounded w-50"></div>
        </span>
        <div className="flex flex-row flex-wrap justify-start items-start w-full gap-2
                            font-[family-name:var(--font-text)] text-[var(--native-hint-color)] text-sm">
          <div className="h-3 bg-gray-500 rounded w-10"></div>
          <div className="h-3 bg-gray-500 rounded w-8"></div>
          <div className="h-3 bg-gray-500 rounded w-14"></div>
        </div>
        {/*<div className="flex flex-col items-center justify-center bg-[var(--native-bg-color)] rounded-2xl px-1 py-1">*/}
        {/*  <div className="h-3 bg-gray-500 rounded w-14"></div>*/}
        {/*</div>*/}
      </div>
    </div>
      );
      }
