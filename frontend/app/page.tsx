// import SmallContentCard from "@/components/SmallContentCard";
import {Button} from "@/components/Button";
import Link from "next/link";
import React from "react";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-9 px-4 py-8">
      <div className="flex flex-col gap-1 bg-[var(--native-bg-color)] p-3 rounded-2xl">
        <Logo />
        <h3 className="font-[family-name:var(--font-subheader)] text-xl text-center">Сервис по поиску фильмов и сериалов</h3>
      </div>
      {/* ДЛЯ БУДУЩИХ ФИЧ */}
      {/*<div className="flex flex-col bg-[var(--native-bg-color)] p-3 gap-2 rounded-2xl">*/}
      {/*  <div>*/}
      {/*    <span className="font-[family-name:var(--font-subheader)] text-2xl me-2">*/}
      {/*      Каталог*/}
      {/*    </span>*/}
      {/*    <span*/}
      {/*      className="font-[family-name:var(--font-subheader)] text-xs uppercase px-1 py-0.5*/}
      {/*                  rounded-xl bg-[var(--native-focus-color)]">*/}
      {/*      новинки*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*  <div className="flex flex-row items-center justify-center gap-4">*/}
      {/*    <div className="grid grid-flow-col auto-cols-fr gap-3">*/}
      {/*      <SmallContentCard title="Игра престолов" genres={"Сериал, фэнтези, драма, боевик"}*/}
      {/*                        imageSrc="/static/images/test_img1.png"/>*/}
      {/*      <SmallContentCard title="Очень странные дела" genres={"Сериал, ужастик, фантастика, фэнтези"}*/}
      {/*                        imageSrc="/static/images/test_img2.png"/>*/}
      {/*    </div>*/}
      {/*    <div className="flex flex-col items-center gap-1">*/}
      {/*      <div className="relative min-w-12 min-h-12 bg-[var(--native-secondary-bg-color)] rounded-xl">*/}
      {/*        <Image fill className="object-fill p-1" src={"/static/icons/arrow.svg"} alt="Arrow"/>*/}
      {/*      </div>*/}
      {/*      <span className="font-[family-name:var(--font-text)] text-center text-xs">*/}
      {/*        Показать ещё*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="flex justify-between gap-3">*/}
      {/*  <div*/}
      {/*    className='px-2 py-2.5 bg-[var(--native-bg-color)] font-[family-name:var(--font-subheader)] text-sm*/}
      {/*                rounded-xl'>*/}
      {/*    Более <span className="text-[var(--native-focus-color)]">500</span> фильмов и сериалов на нашем сервисе*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    className='px-2 py-2.5 bg-[var(--native-bg-color)] font-[family-name:var(--font-subheader)] text-sm*/}
      {/*                rounded-xl'>*/}
      {/*    Целых <span className="text-[var(--native-focus-color)]">54</span> человека сейчас ищут фильм вместе с тобой*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="flex flex-col items-center gap-3">
        <Link href={`/survey`}>
          <Button size="xl">Найти фильм</Button>
        </Link>
        {/*<Button variant="secondary" size="default">Создать комнату</Button>*/}
      </div>
    </div>
  );
}
