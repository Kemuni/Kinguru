import {Button} from "@/components/Button";
import Link from "next/link";
import Logo from "@/components/Logo";
import React from "react";
import Image from "next/image";
import ChevronIco from "@/public/static/icons/chevron.svg";
import Minus from "@/public/static/icons/icon-minus.svg";
import Plus from "@/public/static/icons/icon-plus.svg";


export default function Home() {
    return (
        <div className="flex flex-col h-dvh max-h-dvh items-center justify-center gap-1">
            <header
                className="grid grid-cols-[48px_1fr] w-full items-center justify-center gap-3 py-0.5 px-4 mx-4 mt-2">
                <Link href="/">
                    <Button variant="dark" size="icon_auto" >
                        <Image width={48} height={48} src={ChevronIco} alt="Back"/>
                    </Button>
                </Link>
                <div className="w-full pe-16">
                    <Logo size="lg"/>
                </div>
            </header>
            <div className="flex items-center rounded-2xl bg-[var(--native-bg-color)] justify-center flex-col
                            w-full h-full overflow-hidden py-1.5 pe-0.5">
                <div className="flex flex-col px-4 gap-6 w-full overflow-y-scroll h-full scrollbar">
                    <p className="text-3xl mt-4 font-[family-name:var(--font-subheader)] items-start">Добавление фильмов</p>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <p className="font-[family-name:var(--third-family)]">Русское название</p>
                            <input
                                type="text"
                                placeholder="Введите русское название"
                                className="flex flex-row items-center justify-start focus:outline-none ps-2 py-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)] "/>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-[family-name:var(--third-family)]">Английское название</p>
                            <input
                                type="text"
                                placeholder="Введите английское название"
                                className="flex flex-row items-center justify-start focus:outline-none py-2 ps-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)] "/>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-[family-name:var(--third-family)]">Оригинальное название</p>
                            <input
                                type="text"
                                placeholder="Введите оригинальное название"
                                className="flex flex-row items-center justify-start focus:outline-none py-2 ps-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)]"/>
                        </div>
                        <div className="flex flex-row justify-between gap-6">
                            <div className="">
                                <p className="font-[family-name:var(--third-family)]">IMDb ID</p>
                                <input
                                    type="text"
                                    placeholder="IMDb"
                                    className="flex flex-row w-full  items-center justify-start focus:outline-none py-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)] "/>
                            </div>
                            <div className="">
                                <p className="font-[family-name:var(--third-family)]">TMDb ID</p>
                                <input
                                    type="text"
                                    placeholder="TMDb"
                                    className="flex flex-row w-full  items-center justify-start focus:outline-none py-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)] "/>
                            </div>
                            <div className="">
                                <p className="font-[family-name:var(--third-family)]">Дата выпуска</p>
                                <input
                                    type="text"
                                    placeholder="2024-12-16"
                                    className="flex flex-row w-full justify-start focus:outline-none py-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)] "/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-[family-name:var(--third-family)]">Жанры</p>
                            <input
                                type="text"
                                placeholder="Боевик, комедия, драма"
                                className="flex flex-row items-center justify-start focus:outline-none py-2 ps-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)] "/>
                        </div>
                        <div className="flex flex-row gap-6">
                            <div className="">
                                <p className="font-[family-name:var(--third-family)]">Путь к постеру</p>
                                <input
                                    type="text"
                                    placeholder="Введите путь"
                                    className="flex flex-row items-center justify-start focus:outline-none py-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)] "/>
                            </div>
                            <div className="">
                                <p className="font-[family-name:var(--third-family)]">Продолж. (мин)</p>
                                <input
                                    type="text"
                                    placeholder="Длительность"
                                    className="flex flex-row items-center justify-start focus:outline-none py-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)] "/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <p className="font-[family-name:var(--third-family)]">Рейтинги</p>
                            <div className="flex flex-row gap-6">
                                <Image src={Minus} width={24} height={24} alt="minus"/>
                                <div className="">
                                    <input
                                        type="text"
                                        placeholder="IMDb"
                                        className="flex flex-row items-center justify-start focus:outline-none py-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-text-color)]"/>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="4.5"
                                        className="flex flex-row items-center justify-start focus:outline-none py-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-text-color)] "/>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="20K"
                                        className="flex flex-row items-center justify-start focus:outline-none py-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-text-color)] "/>
                                </div>
                            </div>
                            <div className="flex flex-row gap-6">
                                <Image height={24} width={24} src={Plus} alt="plus"/>
                                <div className="">
                                    <input
                                        type="text"
                                        placeholder="Источник"
                                        className="flex flex-row items-center justify-start focus:outline-none py-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)] "/>
                                </div>
                                <div className="">
                                    <input
                                        type="text"
                                        placeholder="Рейтинг"
                                        className="flex flex-row items-center justify-start focus:outline-none py-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)] "/>
                                </div>
                                <div className="">
                                    <input
                                        type="text"
                                        placeholder="Оценки"
                                        className="flex flex-row items-center justify-start focus:outline-none py-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)] "/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-[family-name:var(--third-family)]">Страны</p>
                            <input
                                type="text"
                                placeholder="Соединённые Штаты Америки, Германия"
                                className="flex flex-row items-center justify-start focus:outline-none py-2 ps-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)] "/>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-[family-name:var(--third-family)]">Режиссёры</p>
                            <input
                                type="text"
                                placeholder="Джон Вильямс, Симонов Иван"
                                className="flex flex-row items-center justify-start focus:outline-none py-2 ps-2 bg-[var(--native-bg-color)] border-b-4 border-[var(--native-secondary-bg-color)] w-full font-[family-name:var(--third-family)] placeholder-[var(--native-hint-color)]"/>
                        </div>
                        <div className="flex mb-4 flex-col gap-1">
                            <p className="font-[family-name:var(--third-family)]">Описание</p>
                            <textarea
                                style={{resize: "none"}}
                                placeholder="Введите описание фильма"
                                className="flex flex-row w-full h-24 rounded-2xl focus:outline-none py-2 ps-2 items-center bg-[var(--native-hint-color)] placeholder-[var(--native-secondary-text-color)]"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
        ;
}

