"use client";

import Logo from "@/components/Logo";
import React, { useState } from 'react';
import Modal from 'react-modal';
import {Button} from "@/components/Button";
import Link from "next/link";


export default function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const modalContent = (

        <div
            className="flex  flex-col gap-9 border border-[rgba(255,255,255,0.25)] rounded-lg p-3 w-full wh-1/2 bg-[var(--native-bg-color)]">
            <div className="flex space-x-28">
                <div
                    className=" color-[var(--native-text-color)] font-semibold text-3xl">
                    Импорт фильмов
                </div>
                <button className="text-white" onClick={closeModal}>✖️</button>
            </div>
            <div className="flex flex-col">
                <div className="flex items-start justify-start flex-col">
                    <div
                        className=" font-normal text-2xl font-family-[var(--third-family)] color-[var(--native-text-color)] ">
                        Файл с фильмами(.csv)
                    </div>
                    <input
                        type="file"
                        id="csv-file"
                        className="bg-[var(--native-hint-color)] flex items-center justify-between flex-row gap- rounded-[0.625rem] p-[0.5rem_1rem] w- h-"
                        onChange={(e) => {
                            // Проверка наличия элемента
                            const fileCheckDiv = document.getElementById("file-check");
                            if (!fileCheckDiv) return;

                            // Проверка наличия файлов
                            const files = e.target.files;
                            if (files && files.length > 0) {
                                const fileName = files[0].name; // Получаем имя файла
                                const isCsv = fileName.endsWith(".csv"); // Проверка расширения

                                // Показать галочку или крестик
                                fileCheckDiv.innerHTML = isCsv
                                    ? '<span style="color: green;">✔️</span>'
                                    : '<span style="color: red;">✖️</span>';
                            } else {
                                // Очистить, если файл не выбран
                                fileCheckDiv.innerHTML = "";
                            }
                        }}
                    />

                    <label htmlFor="csv-file"
                           className="bg-[var(--native-hint-color)] flex items-center justify-between flex-row mt-1 mb-3 rounded-lg py-2 px-4 w-full">
                        Выберите файл
                        <div id="file-check"></div>
                    </label>


                    <div className="flex items-center justify-start flex-row">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.65723 16C12.7994 16 16.1572 12.6421 16.1572 8.5C16.1572 4.35786 12.7994 1 8.65723 1C4.51509 1 1.15723 4.35786 1.15723 8.5C1.15723 12.6421 4.51509 16 8.65723 16Z"
                                stroke="#888888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.65723 11.5V8.5M8.65723 5.5H8.66473" stroke="#888888" stroke-width="1.5"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <a
                            className="color-[var(--native-hint-color)] font-family-[var(--second-family)] font-normal text-s underline decoration-none">
                            скачать шаблон файла
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div
                    className="mt-3">
                    <Link href={``}>
                        <Button size="xl">Импортировать</Button>
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-dvh max-h-dvh items-center justify-start gap-3 ">
            <header className="mt-3">
                <div
                    className="flex items-center justify-center flex-col gap-2.5 bg-[var(--native-bg-color)] rounded-2xl py-2 h-5.25 min-w-80">
                    <Logo size="gl"/>
                </div>
            </header>
            <div
                className="flex items-center justify-between flex-row gap-0.625 rounded-lg px-3 py-0.5 w-full h-14 bg-[var(--native-bg-color)]">
                <div
                    className="font-normal text-[20px] font-family-[var(--second-family)] color-[var(--native-text-color)]">
                    Кол-во фильмов на сайте
                </div>
                <div
                    className="font-semibold text-xl font-family-[var(--second-family)] color-[var(--native-text-color)]">
                    321.2К
                </div>
            </div>
            <div
                className="flex flex-col gap-6 rounded-lg p-3 w-full bg-[var(--native-bg-color)]">
                <div
                    className="font-semibold text-xl font-family-[var(--second-family)] color-[var(--native-text-color)]">
                    Популярные жанры
                </div>
                <div className="flex overflow-x-scroll scrollbar gap-x-10 justify-between">
                    <div
                        className="flex justify-between  flex-col gap-1 rounded-lg p-3  bg-[var(--native-secondary-bg-color)]">
                        <div
                            className="flex items-center justify-start flex-row gap-x w-full">
                            <div
                                className="font-normal text-xl text-justify font-family-[var(--second-family)] color-[var(--native-text-color)]">
                                Комедия
                            </div>
                            <div
                                className="flex items-end justify-center flex-row gap-0 rounded-lg px-1.5 py-0.5 bg-[var(--native-focus-color)]">
                                <div
                                    className="font-normal text-xs uppercase text-center font-family-[var(--font3)] color-[var(--native-text-color)]">
                                    40%
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex items-end justify-start flex-row">
                            <div
                                className="font-normal text-s text-justify font-family-[var(--second-family)] color-[var(--native-secondary-text-color)]">
                                всего
                            </div>
                            <div
                                className="font-semibold text-xl text-justify font-family-[var(--second-family)] color-[var(--native-text-color)]">
                                130.1К
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex justify-between flex-col gap-1 rounded-lg p-3  bg-[var(--native-secondary-bg-color)]">
                        <div
                            className="flex items-center justify-start flex-row gap-x w-full">
                            <div
                                className="font-normal text-xl text-justify font-family-[var(--second-family)] color-[var(--native-text-color)]">
                                Драмы
                            </div>
                            <div
                                className="flex items-end justify-center flex-row gap-0 rounded-lg px-1.5 py-0.5 bg-[var(--native-focus-color)]">
                                <div
                                    className="font-normal text-xs uppercase text-center font-family-[var(--font3)] color-[var(--native-text-color)]">
                                    28%
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex items-end justify-start flex-row">
                            <div
                                className="font-normal text-s text-justify font-family-[var(--second-family)] color-[var(--native-secondary-text-color)]">
                                всего
                            </div>
                            <div
                                className="font-semibold text-xl text-justify font-family-[var(--second-family)] color-[var(--native-text-color)]">
                                91.0К
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex justify-between flex-col gap-1 rounded-lg p-3  bg-[var(--native-secondary-bg-color)]">
                        <div
                            className="flex items-center justify-start flex-row gap-x w-full">
                            <div
                                className="font-normal text-xl text-justify font-family-[var(--second-family)] color-[var(--native-text-color)]">
                                Хоррор
                            </div>
                            <div
                                className="flex items-end justify-center flex-row gap-0 rounded-lg px-1.5 py-0.5 bg-[var(--native-focus-color)]">
                                <div
                                    className="font-normal text-xs uppercase text-center font-family-[var(--font3)] color-[var(--native-text-color)]">
                                    16%
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex items-end justify-start flex-row">
                            <div
                                className="font-normal text-s text-justify font-family-[var(--second-family)] color-[var(--native-secondary-text-color)]">
                                всего
                            </div>
                            <div
                                className="font-semibold text-xl text-justify font-family-[var(--second-family)] color-[var(--native-text-color)]">
                                52.4К
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex justify-between  flex-col gap-1 rounded-lg p-3  bg-[var(--native-secondary-bg-color)]">
                        <div
                            className="flex items-center justify-start flex-row gap-x w-full">
                            <div
                                className="font-normal text-xl text-justify font-family-[var(--second-family)] color-[var(--native-text-color)]">
                                Боевик
                            </div>
                            <div
                                className="flex items-end justify-center flex-row gap-0 rounded-lg px-1.5 py-0.5 bg-[var(--native-focus-color)]">
                                <div
                                    className="font-normal text-xs uppercase text-center font-family-[var(--font3)] color-[var(--native-text-color)]">
                                    13%
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex items-end justify-start flex-row">
                            <div
                                className="font-normal text-s text-justify font-family-[var(--second-family)] color-[var(--native-secondary-text-color)]">
                                всего
                            </div>
                            <div
                                className="font-semibold text-xl text-justify font-family-[var(--second-family)] color-[var(--native-text-color)]">
                                6.1К
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex justify-between  flex-col gap-1 rounded-lg p-3  bg-[var(--native-secondary-bg-color)]">
                        <div
                            className="flex items-center justify-start flex-row gap-x w-full">
                            <div
                                className="font-normal text-xl text-justify font-family-[var(--second-family)] color-[var(--native-text-color)]">
                                Аниме
                            </div>
                            <div
                                className="flex items-end justify-center flex-row gap-0 rounded-lg px-1.5 py-0.5 bg-[var(--native-focus-color)]">
                                <div
                                    className="font-normal text-xs uppercase text-center font-family-[var(--font3)] color-[var(--native-text-color)]">
                                    99%
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex items-end justify-start flex-row">
                            <div
                                className="font-normal text-s text-justify font-family-[var(--second-family)] color-[var(--native-secondary-text-color)]">
                                всего
                            </div>
                            <div
                                className="font-semibold text-xl text-justify font-family-[var(--second-family)] color-[var(--native-text-color)]">
                                999.1К
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="flex items-center justify-between flex-row gap-2.5 rounded-lg py-1.5 px-3 w-full bg-[var(--native-bg-color)]">
                <div
                    className="font-normal text-xl font-family-[var(--second-family)] color-[var(--native-text-color)]">
                    Каталог фильмов
                </div>
                <div className="rounded-lg">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 10L32 24L18 38" stroke="white" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className="flex items-center justify-center flex-col gap-3 w-11/12 h-">
                <div
                    className="bg-[var(--native-focus-color)] flex items-center justify-center flex-col gap-0 rounded-[0.9375rem] p- w-full h-">
                    <Link href={''}>
                        <Button>
                            Добавить фильм
                        </Button>
                    </Link>
                </div>
                <input type="checkbox" id="modal-toggle" className="hidden"/>
                <Button variant="secondary" className="w-full" onClick={openModal}>Импорт из файла (.csv)</Button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="flex items-center justify-center flex-col  "
                    overlayClassName="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50"
                >
                    {modalContent}
                    </Modal>
                    <div className="flex items-center justify-start flex-row">
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9 17C13.1421 17 16.5 13.6421 16.5 9.5C16.5 5.35786 13.1421 2 9 2C4.85786 2 1.5 5.35786 1.5 9.5C1.5 13.6421 4.85786 17 9 17Z"
                                stroke="#888888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 12.5V9.5M9 6.5H9.0075" stroke="#888888" stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                        <div
                            className="font-normal text-[1rem] underline decoration-none text-[var(--native-hint-color)] font-family-[var(--second-family)]">
                            Скачать шаблон файла
                        </div>
                    </div>
                </div>
            </div>
            );
            }
