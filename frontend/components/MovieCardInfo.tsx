"use client"

import Image from "next/image";
import PosterPlaceholder from "@/public/static/images/poster_loading_placeholder.png";
import {TabList} from "@/components/TabList";
import {TabItem} from "@/components/TabItem";
import React, {FC, useEffect, useState} from "react";
import {Movie} from "@/types/Movie";
import {APIEndpointsUrls, baseURL} from "@/services/api-urls";


interface MovieCardInfoProps {
  movie: Movie | undefined
}


export const MovieCardInfo: FC<MovieCardInfoProps> = ({ movie }) => {
  const [ isDescriptionExpanded, setDescriptionExpanded ] = useState<boolean>(false);
  const [ isPosterLoading, setPosterLoading ] = useState<boolean>(true);

  useEffect(() => {
    setPosterLoading(true);
    setDescriptionExpanded(false);
  }, [movie])

  if (movie === undefined) return <MovieCardSkeleton/>
  return (
    <TabList activeTabIndex={0}>
      <TabItem label="О фильме" className="w-full h-full relative">
        <div className="flex flex-col gap-1 w-full overflow-y-scroll absolute top-0 bottom-0 left-0"
             style={{scrollbarWidth: "none"}}
        >
          <div className="relative flex-grow-0 aspect-2/3">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              className="object-cover rounded-xl w-full h-auto aspect-2/3"
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
          </div>
          <div
            className="flex flex-row justify-between w-full px-2 text-sm font-[family-name:var(--font-text)]
                        text-[var(--native-hint-color)]">
            <div className="flex gap-2">
              <span className="text-[var(--additional-green)] font-[family-name:var(--font-subheader)] font-bold">
                {
                  movie.ratings.find(rating => rating.source === "imdb")?.vote_average.toFixed(1)
                  ?? movie.ratings[0]?.vote_average.toFixed(1)
                }
              </span>
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
            className="text-left w-full font-[family-name:var(--font-subheader)] text-3xl mb-1"
          >
            {movie.ru_title}
          </span>
          <div className="flex flex-row flex-wrap justify-start items-start w-full gap-2
                              font-[family-name:var(--font-text)] text-[var(--native-hint-color)] text-sm">
            {
              movie.genres.map((genreName) => (
                  <div
                    key={genreName}
                    className="bg-[var(--native-secondary-bg-color)] px-2 py-0.5 rounded-full">
                    {genreName}
                  </div>
                )
              )
            }
          </div>
        </div>
      </TabItem>
      <TabItem label="Детали" className="w-full h-full relative">
        <div className="flex flex-col gap-2 rounded-lg overflow-y-scroll scrollbar absolute top-0 bottom-0 left-0">
          <div className="text-center">
            <span
              className="w-full font-[family-name:var(--font-subheader)] text-3xl"
            >
              {movie.ru_title}
            </span>
          </div>
          <div className="mt-2 mx-4 flex flex-col gap-4">
            <div className="flex flex-row items-left justify-left gap-6">
              {
                movie.ratings.map((rating, index) => (
                  <div key={index}
                       className="flex flex-col items-end px-3 py-0.5 rounded-lg bg-[var(--native-secondary-bg-color)]
                       justify-start text-lg"
                  >
                    <div className="w-full font-semibold">
                      {rating.source.charAt(0).toUpperCase() + rating.source.slice(1)}
                    </div>
                    <span className="text-[var(--native-secondary-text-color)] text-base">
                        <span className="font-semibold text-[var(--native-text-color)] text-xl ps-3">
                          {rating.vote_average.toFixed(2)}
                        </span>
                      {" "}из 10
                      </span>
                  </div>
                ))
              }
            </div>
            <div className="text-justify font-[family-name:var(--font-text)] font-normal leading-5">
              {isDescriptionExpanded ? movie.description : movie.description.slice(0, 150)}
              <span className="text-[var(--native-focus-color)]"
                    onClick={() => setDescriptionExpanded(!isDescriptionExpanded)}>
                  {isDescriptionExpanded ? " Свернуть..." : " Читать далее..."}
              </span>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              {
                movie.countries.length ?
                  <div className="flex flex-row items-center justify-start gap-2 w-full">
                    <span className="w-1/2 text-[var(--native-secondary-text-color)]">Страна:</span>
                    <span className="w-1/2">{movie.countries.join(', ')}</span>
                  </div>
                  : null
              }
              {
                movie.release_date.length ?
                  <div className="flex flex-row items-center justify-start gap-2 w-full">
                    <span className="w-1/2 text-[var(--native-secondary-text-color)]">Год выпуска:</span>
                    <span className="w-1/2">{movie.release_date.substring(0, 4)}</span>
                  </div>
                  : null
              }
              {
                movie.directors.length ?
                  <div className="flex flex-row items-center justify-start gap-2 w-full">
                    <span className="w-1/2 text-[var(--native-secondary-text-color)]">
                      Режиссер{movie.directors.length > 1 ? "ы" : ""}:
                    </span>
                    <span className="w-1/2">{movie.directors.join(', ')}</span>
                  </div>
                  : null
              }
              {
                movie.duration ?
                  <div className="flex flex-row items-center justify-start gap-2 w-full">
                    <span className="w-1/2 text-[var(--native-secondary-text-color)]">Длительность:</span>
                    <span className="w-1/2">{movie.duration} минуты</span>
                  </div>
                  : null
              }
              <div>
                <span>Нашли ошибку? <span className="text-[var(--native-focus-color)]">Сообщите нам</span></span>
              </div>
            </div>
          </div>
        </div>
      </TabItem>
    </TabList>
  )
}


const MovieCardSkeleton: FC = () => {
  return (
    <TabList activeTabIndex={0}>
      <TabItem label="О фильме">
        <div className="flex flex-col gap-2 w-full h-full animate-pulse">
          <div className="relative flex-grow-0 aspect-2/3">
            <Image fill
                   sizes="100%"
                   className="object-cover rounded-xl w-full h-full aspect-2/3"
                   src={PosterPlaceholder}
                   alt="Content image"/>
          </div>
          <div
            className="flex flex-row justify-between w-full px-2 text-sm font-[family-name:var(--font-text)]
                        text-[var(--native-hint-color)]">
            <div className="flex gap-2">
              <span className="text-[var(--additional-green)] font-[family-name:var(--font-subheader)] font-bold">
                <div className="h-5 bg-gray-500 rounded w-6"></div>
              </span>
              <span>
                <div className="h-5 bg-gray-500 rounded w-12"></div>
              </span>
            </div>
            <div className="flex">
              <div className="h-5 bg-gray-500 rounded w-16"></div>
            </div>
          </div>
          <span
            className="text-left w-full font-[family-name:var(--font-subheader)] text-3xl"
          >
            <div className="h-9 bg-gray-500 rounded w-80"></div>
          </span>
          <div className="flex flex-row flex-wrap justify-start items-start w-full gap-2
                              font-[family-name:var(--font-text)] text-[var(--native-hint-color)] text-sm">
            <div className="h-6 bg-gray-500 rounded w-16"></div>
            <div className="h-6 bg-gray-500 rounded w-12"></div>
            <div className="h-6 bg-gray-500 rounded w-18"></div>
          </div>
        </div>
      </TabItem>
      <TabItem label="Детали">
        <div className="flex flex-col gap-2 rounded-lg animate-pulse">
          <div className="text-center">
            <span
              className="w-full flex justify-center"
            >
              <p className="h-10 bg-gray-500 rounded w-3/4 text-center"></p>
            </span>
          </div>
          <div className="mt-2 mx-4 flex flex-col gap-4">
            <div className="flex flex-row items-left justify-left gap-6">
              <div className="h-20 bg-gray-500 rounded w-1/3"></div>
              <div className="h-20 bg-gray-500 rounded w-1/3"></div>
            </div>
            <div className="space-y-2.5">
              <div className="w-full gap-2 flex flex-shrink">
                <div className="h-4 bg-gray-500 rounded w-40"></div>
                <div className="h-4 bg-gray-500 rounded w-52"></div>
                <div className="h-4 bg-gray-600 rounded w-10"></div>
              </div>
              <div className="w-full gap-2 flex flex-shrink">
                <div className="h-4 bg-gray-500 rounded w-24"></div>
                <div className="h-4 bg-gray-600 rounded w-12"></div>
                <div className="h-4 bg-gray-600 rounded w-32"></div>
                <div className="h-4 bg-gray-500 rounded w-44"></div>
              </div>
              <div className="w-full gap-2 flex flex-shrink">
                <div className="h-4 bg-gray-500 rounded w-52"></div>
                <div className="h-4 bg-gray-600 rounded w-28"></div>
                <div className="h-4 bg-gray-600 rounded w-10"></div>
              </div>
              <div className="w-full gap-2 flex flex-shrink">
                <div className="h-4 bg-gray-600 rounded w-40"></div>
                <div className="h-4 bg-gray-600 rounded w-16"></div>
                <div className="h-4 bg-gray-500 rounded w-56"></div>
              </div>
              <div className="w-full gap-2 flex flex-shrink">
                <div className="h-4 bg-gray-500 rounded w-24"></div>
                <div className="h-4 bg-gray-600 rounded w-32"></div>
                <div className="h-4 bg-gray-500 rounded w-12"></div>
                <div className="h-4 bg-gray-500 rounded w-44"></div>
              </div>
              <div className="w-full gap-2 flex flex-shrink">
                <div className="h-4 bg-gray-600 rounded w-28"></div>
                <div className="h-4 bg-gray-500 rounded w-52"></div>
                <div className="h-4 bg-gray-600 rounded w-28"></div>
              </div>
              <div className="w-full gap-2 flex flex-shrink">
                <div className="h-4 bg-gray-600 rounded w-12"></div>
                <div className="h-4 bg-gray-500 rounded w-24"></div>
                <div className="h-4 bg-gray-600 rounded w-32"></div>
                <div className="h-4 bg-gray-500 rounded w-44"></div>
              </div>
              <div className="w-full gap-2 flex flex-shrink">
                <div className="h-4 bg-gray-500 rounded w-40"></div>
                <div className="h-4 bg-gray-600 rounded w-10"></div>
                <div className="h-4 bg-gray-500 rounded w-52"></div>
              </div>
            </div>
            <div className="w-full grid grid-cols-2 template gap-2 mt-2">
              <span className="h-6 w-28 bg-gray-500 rounded"></span>
              <span className="h-6 w-36 bg-gray-500 rounded"></span>

              <span className="h-6 w-32 bg-gray-500 rounded"></span>
              <span className="h-6 w-16 bg-gray-500 rounded"></span>

              <span className="h-6 w-36 bg-gray-500 rounded"></span>
              <span className="h-6 w-24 bg-gray-500 rounded"></span>

              <span className="h-6 w-16 bg-gray-500 rounded"></span>
              <span className="h-6 w-12 bg-gray-500 rounded"></span>
            </div>
            <div className="flex gap-2">
              <div className="h-4 bg-gray-500 rounded w-52"></div>
              <div className="h-4 bg-gray-600 rounded w-36"></div>
            </div>
          </div>
        </div>
      </TabItem>
    </TabList>
  );
}
