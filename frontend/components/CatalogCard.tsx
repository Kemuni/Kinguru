"use client"

import Image from "next/image";
import {Button} from "@/components/Button";
import React, {FC} from "react";
import SearchIco from "@/public/static/icons/seacrh.svg";
import {MovieCardInfoCatalog} from "@/components/MovieCardInfoCatalog";
import {useGetRandomMovieListItems} from "@/hooks/movie";



const CatalogCard: FC = () => {
  const { movies, isLoading} = useGetRandomMovieListItems();
  return (
    <div className="flex flex-col flex-grow overflow-hidden bg-[var(--native-bg-color)] mx-3 py-4 px-4 rounded-2xl w-full divide-y-2 divide-[var(--additional-hint-fill)] h-full">
      <div className="flex flex-col gap-4 pb-2">
        <p className="flex text-3xl font-[family-name:var(--font-subheader)]">Каталог</p>
        <div className="flex flex-row items-start justify-between gap-3 w-full ">
          <input
            type="text"
            placeholder="Введите название"
            className="flex flex-row justify-start py-2 px-4 bg-[var(--native-secondary-bg-color)] rounded-2xl w-full font-[family-name:var(--third-family)] placeholder-[var(--native-secondary-text-color)]"
          />
          <Button variant="dark" size="icon_auto">
            <Image width={48} height={48} src={SearchIco} alt="Find"/>
          </Button>
        </div>
        <div className="flex flex-row items-start justify-start gap-3 w-full">
          <p className="flex text-xl font-[family-name:var(--second-family)] text-[var(--native-text-color)]">Жанр</p>
          <select
            className="flex items-start justify-start px-2 border-r-4 border-transparent pb-2 bg-[var(--native-secondary-bg-color)] rounded-xl text-xl font-[family-name:var(--second-family)] text-[var(--native-text-color)]">
            <option
              className="text-xl font-[family-name:var(--second-family)] text-[var(--native-text-color)]">Любой
            </option>
            <option
              className="text-xl font-[family-name:var(--second-family)] text-[var(--native-text-color)]">Драма
            </option>
            <option
              className="text-xl font-[family-name:var(--second-family)] text-[var(--native-text-color)]">Комедия
            </option>
            <option
              className="text-xl font-[family-name:var(--second-family)] text-[var(--native-text-color)]">Фэнтези
            </option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-4 overflow-y-scroll" style={{scrollbarWidth: "none"}}
      >
        <p className="flex text-2xl font-[family-name:var(--font-subheader)]">Результаты запроса:</p>
        <div className="flex flex-col items-start justify-start">
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 w-full">
            {
              isLoading
                ? <h4>Загружается</h4>
                : movies.map((movie) => (
                    <MovieCardInfoCatalog movie={movie} key={movie.id} />
                  ))
            }
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
              <a href="#"
                 className="rounded-l-2xl relative items-center px-3 py-2 text-sm font-[family-name:var(--second-family)] text-[var(--native-text-color)] ring-1 ring-[var(--additional-hint-fill)] hover:bg-[var(--native-hint-color)]">
                <span className="sr-only">Previous</span>
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fill-rule="evenodd"
                        d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                        clip-rule="evenodd"></path>
                </svg>
              </a>
              <a href="#" aria-current="page"
                 className="relative items-center px-3 py-2 text-sm font-[family-name:var(--second-family)] text-[var(--native-text-color)] ring-1 ring-[var(--additional-hint-fill)] hover:bg-[var(--native-hint-color)]">01</a>
              <a href="#"
                 className="relative items-center px-3 py-2 text-sm font-[family-name:var(--second-family)] text-[var(--native-text-color)] ring-1 ring-[var(--additional-hint-fill)] hover:bg-[var(--native-hint-color)]">02</a>
              <a href="#"
                 className="relative items-center px-3 py-2 text-sm font-[family-name:var(--second-family)] text-[var(--native-text-color)] ring-1 ring-[var(--additional-hint-fill)] hover:bg-[var(--native-hint-color)]">03</a>
              <span
                className="relative items-center px-3 py-2 text-sm font-[family-name:var(--second-family)] text-[var(--native-text-color)] ring-1 ring-[var(--additional-hint-fill)] hover:bg-[var(--native-hint-color)]">...</span>
              <a href="#"
                 className="relative items-center px-3 py-2 text-sm font-[family-name:var(--second-family)] text-[var(--native-text-color)] ring-1 ring-[var(--additional-hint-fill)] hover:bg-[var(--native-hint-color)]">08</a>
              <a href="#"
                 className="relative items-center px-3 py-2 text-sm font-[family-name:var(--second-family)] text-[var(--native-text-color)] ring-1 ring-[var(--additional-hint-fill)] hover:bg-[var(--native-hint-color)]">09</a>
              <a href="#"
                 className="relative items-center px-3 py-2 text-sm font-[family-name:var(--second-family)] text-[var(--native-text-color)] ring-1 ring-[var(--additional-hint-fill)] hover:bg-[var(--native-hint-color)]">10</a>
              <a href="#"
                 className="rounded-r-2xl relative items-center px-3 py-2 text-sm font-[family-name:var(--second-family)] text-[var(--native-text-color)] ring-1 ring-[var(--additional-hint-fill)] hover:bg-[var(--native-hint-color)]">
                <span className="sr-only">Next</span>
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fill-rule="evenodd"
                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd"></path>
                </svg>
              </a>
            </nav>
          </div>
        </div>

      </div>
    </div>

  );
};

export default CatalogCard;