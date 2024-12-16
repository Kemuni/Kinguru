import {Button} from "@/components/Button";
import ChevronIco from "@/public/static/icons/chevron.svg";
import Image from "next/image";
import Logo from "@/components/Logo";
import Link from "next/link";
import {MovieReviewCard} from "@/components/MovieReviewCard";

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
      <header className="grid grid-cols-[48px_1fr] w-full items-center justify-center gap-3 py-0.5 px-4 mx-4 mt-2">
        <Link href="/">
          <Button variant="dark" size="icon_auto">
            <Image width={48} height={48} src={ChevronIco} alt="Back"/>
          </Button>
        </Link>
        <div className="w-full pe-16">
          <Logo size="lg"/>
        </div>
      </header>
      <div className="w-full flex-grow">
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
