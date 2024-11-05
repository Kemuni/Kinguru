import {Button} from "@/components/Button";
import ChevronIco from "@/public/static/icons/chevron.svg";
import CancelIco from "@/public/static/icons/cancel.svg";
import HeartIco from "@/public/static/icons/heart.svg";
import Image1 from "@/public/static/images/test_img2.png";
import Image from "next/image";
import Logo from "@/components/Logo";
import Link from "next/link";
import {MovieCard} from "@/components/MovieCard";

export default function Survey() {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-2">
      <header className="grid grid-cols-[48px_1fr] w-full items-center justify-center gap-3 py-2 px-4 mx-4 mt-2">
        <Link href="/">
          <Button variant="dark" size="icon_auto">
            <Image width={48} height={48} src={ChevronIco} alt="Back" />
          </Button>
        </Link>
        <div className="w-full pe-16">
          <Logo size="lg"/>
        </div>
      </header>
      <main
        className="bg-[var(--native-bg-color)] rounded-t-3xl w-full h-full flex flex-col justify-between
        items-center gap-2 py-4 px-3 ring-2 ring-[var(--native-secondary-bg-color)]">
        <div className="flex flex-col gap-2">
          <MovieCard />
        </div>
        <div className="flex flex-row justify-around w-full mb-4">
          <Button variant="secondary_dark" size="icon_auto" className="rounded-full p-2 drop-shadow-md">
            <Image width={64} height={64} src={CancelIco} alt="Back"/>
          </Button>
          <Button variant="secondary_dark" size="icon_auto" className="rounded-full p-2 drop-shadow-md">
            <Image width={64} height={64} src={HeartIco} alt="Back"/>
          </Button>
        </div>
      </main>
    </div>
  );
}
