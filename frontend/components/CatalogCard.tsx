"use client"

import Image from "next/image";
import {Button} from "@/components/Button";
import React, {FC} from "react";
import SearchIco from "@/public/static/icons/seacrh.svg";
import {MovieCardInfoCatalog} from "@/components/MovieCardInfoCatalog";
import {useGetMovieAndPagesListItems} from "@/hooks/movie";
import ChevronIco from "@/public/static/icons/chevron.svg";

enum PageActionType {
  NEXT = 'NEXT',
  PREVIOUS = 'PREVIOUS',
}

const CatalogCard: FC = () => {
  const { data, isLoading, page, setPage } = useGetMovieAndPagesListItems(1);


  function handleButtonClick(type: PageActionType) {
    if (data == undefined) return;
    switch (type) {
      case PageActionType.NEXT:
        if (page < data?.pager.pages_count) setPage(page + 1);
        break;
      case PageActionType.PREVIOUS:
        if (page > 1) setPage(page - 1);
        break;
    }
  }

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
                : data?.items.map((movie) => (
                    <MovieCardInfoCatalog movie={movie} key={movie.id} />
                  ))
            }
          </div>
        </div>
        <div className="flex flex-row justify-around mb-2 lg:mb-0">
          <Button
            variant="secondary_dark" size="icon_auto" className="rounded-full p-2 drop-shadow-md"
            onClick={() => handleButtonClick(PageActionType.PREVIOUS)}
            disabled={page == 1}
          >
            <Image width={48} height={48} src={ChevronIco} alt="Back"/>
          </Button>
          <p className="text-center font-[family-name:var(--font-subheader)] text-2xl my-auto">{page} / {data?.pager.pages_count}</p>
          <Button
            variant="secondary_dark" size="icon_auto" className="rounded-full p-2 drop-shadow-md"
            onClick={() => handleButtonClick(PageActionType.NEXT)}
            disabled={page == data?.pager.pages_count}
          >
            <Image width={48} height={48} src={ChevronIco} className="rotate-180" alt="Next"/>
          </Button>
        </div>

      </div>
    </div>

  );
};

export default CatalogCard;