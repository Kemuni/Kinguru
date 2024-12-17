"use client"

import {Button} from "@/components/Button";
import ChevronIco from "@/public/static/icons/chevron.svg";
import Image from "next/image";
import Logo from "@/components/Logo";
import Link from "next/link";
import {MovieCardInfo} from "@/components/MovieCardInfo";
import React from "react";
import {useGetMovieById} from "@/hooks/movie";

export default function Selected({ params, }: { params: {movieId: number }})
{
  const {movie, isLoading} = useGetMovieById(params.movieId);
  console.log(params)
  return (
    <div className="flex flex-col h-dvh max-h-dvh items-center justify-center gap-1">
      <header className="grid grid-cols-[48px_1fr] w-full items-center justify-center gap-3 py-0.5 px-4 mx-4 mt-2">
        <Link href="/catalog">
          <Button variant="dark" size="icon_auto">
            <Image width={48} height={48} src={ChevronIco} alt="Back" />
          </Button>
        </Link>
        <div className="w-full pe-16">
          <Logo size="lg"/>
        </div>
      </header>
      <div className="
      flex-grow overflow-hidden bg-[var(--native-bg-color)] mx-3 py-4 px-4 rounded-2xl w-full">
        <p className="text-left w-full font-[family-name:var(--font-subheader)] text-2xl mb-5">Информация о фильме</p>
        <MovieCardInfo movie={!isLoading ? movie : undefined} />
      </div>
    </div>
  );
}