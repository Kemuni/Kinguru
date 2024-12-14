import {Button} from "@/components/Button";
import Link from "next/link";
import Logo from "@/components/Logo";
import React from "react";
export default function Home() {
    return (
        <div className="flex flex-col gap-44 h-full items-center justify-start min-h-screen px-4 py-8 ">
            <div className="flex flex-col bg-[var(--native-bg-color)] p-3 rounded-2xl w-full max-w-full">
                <Logo/>
            </div>
            <div
                className="flex items-center justify-center flex-col gap-9 w-full">
                <div
                    className="flex flex-col gap-9 bg-[var(--native-bg-color)] mx-3 py-6 px-16 rounded-2xl w-full">
                    <p className="flex text-3xl font-[family-name:var(--font-subheader)] justify-center items-center ">Админ
                        панель</p>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col justify-start">
                                <p className="font-[family-name:var(--third-family)] font-bold">Логин</p>
                            </div>
                            <input
                                type="text"
                                placeholder="Введите ваш логин"
                                className="flex flex-row items-center justify-start py-2 px-4 bg-[var(--native-hint-color)] rounded-2xl w-full font-[family-name:var(--third-family)] placeholder-[var(--native-secondary-text-color)]"/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col justify-start">
                                <p className="font-[family-name:var(--secondary-family)] font-bold">Пароль</p>
                            </div>
                            <input
                                type="password"
                                placeholder="Введите ваш пароль"
                                className="flex flex-row items-center justify-start py-2 px-4 bg-[var(--native-hint-color)] rounded-2xl w-full font-[family-name:var(--third-family)] placeholder-[var(--native-secondary-text-color)]" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                    <Link href={`/survey`} className="w-full">
                        <Button size="lg" className="w-full">Авторизация</Button>
                    </Link>

                </div>
                </div>

            </div>
        </div>

    );
}
