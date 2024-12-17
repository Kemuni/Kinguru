import {Button} from "@/components/Button";
import ChevronIco from "@/public/static/icons/chevron.svg";
import Image from "next/image";
import Logo from "@/components/Logo";
import Link from "next/link";
import {MovieReviewCard} from "@/components/MovieReviewCard";
import React from "react";

interface SurveyResultsQuery {
  likedMovies?: string,
  dislikedMovies?: string,
}

interface SurveyResults {
  likedMovies: number[],
  dislikedMovies: number[],
}

export default async function SurveyResults(props: {searchParams: { [key: string]: string | string[] | undefined }}) {
  // Получаем результаты тестирования, если возможно
  const searchParams =  props.searchParams as SurveyResultsQuery;
  let surveyResults: SurveyResults | null;
  if (searchParams.likedMovies !== undefined && searchParams.dislikedMovies  !== undefined ) {
    surveyResults = {
      likedMovies: JSON.parse(searchParams.likedMovies),
      dislikedMovies: JSON.parse(searchParams.dislikedMovies),
    }
  } else {
    surveyResults = null;
  }

  return (
    <div className="flex flex-col h-dvh max-h-dvh items-center justify-center gap-1">
      <header
        className="grid grid-cols-[32px_1fr_32px] w-full items-center justify-center gap-3 px-4 my-2"
      >
        <Link href="/" style={{height: "32px"}}>
          <Button variant="dark" size="icon_auto">
            <Image width={32} height={32} src={ChevronIco} alt="Back"/>
          </Button>
        </Link>
        <h2 className="text-center font-[family-name:var(--font-subheader)] text-2xl">
          Рекомендуем Вам
        </h2>
        <Logo size="sm" aria-label="Назад"/>
      </header>
      <div className="w-full flex-grow overflow-hidden">
        {
          surveyResults !== null
            ? <MovieReviewCard
              likedMovies={surveyResults.likedMovies}
              dislikedMovies={surveyResults.dislikedMovies}
            />
            : <h2 className="text-2xl font-[family-name:var(--font-subheader)]">Невозможно получить результаты.</h2>
        }
      </div>
    </div>
  );
}
