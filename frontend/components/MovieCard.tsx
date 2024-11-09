"use client"

import Image from "next/image";
import Image1 from "@/public/static/images/test_img2.png";
import {TabList} from "@/components/TabList";
import {TabItem} from "@/components/TabItem";
import {FC} from "react";

export const MovieCard: FC = () => {
  return (
    <TabList activeTabIndex={0}>
      <TabItem label="О сериале">
        <div>
          <div className="relative w-full" style={{height: "52vh"}}>
            <Image fill className="object-cover rounded-xl" src={Image1} alt="Conent image"/>
          </div>
          <div
            className="flex flex-row justify-between w-full px-2 text-sm
                          font-[family-name:var(--font-text)] text-[var(--native-hint-color)]">
            <div className="flex gap-2">
                  <span className="text-[var(--additional-green)] font-[family-name:var(--font-subheader)] font-bold">
                    4.3
                  </span>
              <span>
                    2016
                  </span>
            </div>
            <div className="flex gap-2">
                  <span>
                    4 сезона
                  </span>
              <span>
                    18+
                  </span>
            </div>
          </div>
          <span
            className="text-left w-full font-[family-name:var(--font-subheader)] text-3xl">Очень странные дела</span>
          <div className="flex flex-row flex-wrap justify-start items-start w-full gap-2
                              font-[family-name:var(--font-text)] text-[var(--native-hint-color)] text-sm">
            <div
              className="bg-[var(--native-hint-color)] px-2 py-0.5 text-[var(--native-text-color)] rounded-full">
              Сериал
            </div>
            <div className="bg-[var(--native-secondary-bg-color)] px-2 py-0.5 rounded-full">
              Ужасы
            </div>
            <div className="bg-[var(--native-secondary-bg-color)] px-2 py-0.5 rounded-full">
              Фантастика
            </div>
            <div className="bg-[var(--native-secondary-bg-color)] px-2 py-0.5 rounded-full">
              Триллер
            </div>
            <div className="bg-[var(--native-secondary-bg-color)] px-2 py-0.5 rounded-full">
              Драма
            </div>
            <div className="bg-[var(--native-secondary-bg-color)] px-2 py-0.5 rounded-full">
              Детектив
            </div>
          </div>
        </div>
      </TabItem>
      <TabItem label="Детали">
        <div className="flex flex-col gap-2 rounded-lg">
          <div className="text-center">
            <span
              className="text-left w-full font-[family-name:var(--font-subheader)] text-3xl">Очень странные дела</span>
          </div>
          <div className="flex flex-row items-center justify-center gap-6">
            <div className="flex flex-col items-end px-3 py-0.5 rounded-lg bg-[var(--native-secondary-bg-color)] justify-start">
              <div className="w-full">Кинопоиск</div>
              <span className="text-[var(--native-secondary-text-color)] text-xs">
                <span className="text-base text-[var(--native-text-color)]">8,4</span> из 10
              </span>
            </div>
            <div
              className="flex flex-col items-end px-3 py-0.5 rounded-lg bg-[var(--native-secondary-bg-color)] justify-start">
              <div className="w-full">MyShows.me</div>
              <span className="text-[var(--native-secondary-text-color)] text-xs">
                <span className="text-base text-[var(--native-text-color)]">4,6</span> из 5
              </span>
            </div>
            <div className="flex flex-col items-end px-3 py-0.5 rounded-lg bg-[var(--native-secondary-bg-color)] justify-start">
              <div className="w-full">IMDB</div>
              <span className="text-[var(--native-secondary-text-color)] text-xs">
                <span className="text-base text-[var(--native-text-color)]">8,7</span> из 10
              </span>
            </div>
          </div>
          <div className="text-justify m-7 font-[family-name:var(--font-subheader)] font-normal">
            1980-е. Рядом с небольшим городком Хокинсом расположился исследовательский центр департамента энергетики. Несмотря на безобидное название, там творятся ужасные вещи: ученые проводят эксперименты на детях, открывают порталы в другое измерение. Во время очередного испытания случается авария из-за чего в наш мир проникает чудовище, угрожающее жителям города..
            <span className="text-[var(--native-focus-color)]">Читать далее...</span>
          </div>
          <div className="flex flex-col items-start justify-start gap-2 mx-7">
            <div className="flex flex-row items-center justify-start gap-2 w-full">
              <span className="w-1/2 text-[var(--native-secondary-text-color)]">Страна:</span>
              <span className="w-1/2">США</span>
            </div>
            <div className="flex flex-row items-center justify-start gap-2 w-full">
              <span className="w-1/2 text-[var(--native-secondary-text-color)]">Год выпуска:</span>
              <span className="w-1/2">2016</span>
            </div>
            <div className="flex flex-row items-center justify-start gap-2 w-full">
              <span className="w-1/2 text-[var(--native-secondary-text-color)]">Длительность серии:</span>
              <span className="w-1/2">63 минуты</span>
            </div>
            <div className="flex flex-row items-center justify-start gap-2 w-full">
              <div className="w-1/2 text-[var(--native-secondary-text-color)]">Количество сезонов:</div>
              <span className="w-1/2">4</span>
            </div>
            <div className="flex flex-row items-center justify-start gap-2 w-full">
              <span className="w-1/2 text-[var(--native-secondary-text-color)]">Количество серий:</span>
              <span className="w-1/2">35</span>
            </div>
            <div>
              <span>Нашли ошибку? <span className="text-[var(--native-focus-color)]">Сообщите нам</span></span>
            </div>
          </div>
        </div>
      </TabItem>
    </TabList>
  )
}







