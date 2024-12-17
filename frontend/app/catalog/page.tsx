import Link from "next/link";
import {Button} from "@/components/Button";
import Image from "next/image";
import ChevronIco from "@/public/static/icons/chevron.svg";

import Logo from "@/components/Logo";
import CatalogCard from "@/components/CatalogCard";



export default function Catalog() {
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
      <CatalogCard/>
    </div>
  )
    ;
}
