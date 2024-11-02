import {Button} from "@/components/Button";
import ChevronIco from "@/public/static/icons/chevron.svg";
import CancelIco from "@/public/static/icons/cancel.svg";
import HeartIco from "@/public/static/icons/heart.svg";
import Image1 from "@/public/static/images/test_img2.png";
import Image from "next/image";
import Logo from "@/components/Logo";
import Link from "next/link";
import {TabList} from "@/components/TabList";
import {TabItem} from "@/components/TabItem";

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
          <TabList>
            <TabItem label="Item 1">Content 1</TabItem>
            <TabItem label="Item 2">Content 2</TabItem>
          </TabList>
          {/*<TabList activeTabIndex={1}>*/}
          {/*  <TabItem label="Tab #2">*/}
          {/*    <p>Selected by default, this is tab #2.</p>*/}
          {/*  </TabItem>*/}
          {/*  <TabItem label="Tab 1">*/}
          {/*    <div>*/}
          {/*      <div className="relative w-full" style={{height: "52vh"}}>*/}
          {/*        <Image fill className="object-cover rounded-xl" src={Image1} alt="Conent image"/>*/}
          {/*      </div>*/}
          {/*      <div*/}
          {/*        className="flex flex-row justify-between w-full px-2 text-sm*/}
          {/*            font-[family-name:var(--font-text)] text-[var(--native-hint-color)]">*/}
          {/*        <div className="flex gap-2">*/}
          {/*    <span className="text-[var(--additional-green)] font-[family-name:var(--font-subheader)] font-bold">*/}
          {/*      4.3*/}
          {/*    </span>*/}
          {/*          <span>*/}
          {/*      2016*/}
          {/*    </span>*/}
          {/*        </div>*/}
          {/*        <div className="flex gap-2">*/}
          {/*    <span>*/}
          {/*      4 сезона*/}
          {/*    </span>*/}
          {/*          <span>*/}
          {/*      18+*/}
          {/*    </span>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*      <span*/}
          {/*        className="text-left w-full font-[family-name:var(--font-subheader)] text-3xl">Очень странные дела</span>*/}
          {/*      <div className="flex flex-row flex-wrap justify-start items-start w-full gap-2*/}
          {/*                font-[family-name:var(--font-text)] text-[var(--native-hint-color)] text-sm">*/}
          {/*        <div*/}
          {/*          className="bg-[var(--native-hint-color)] px-2 py-0.5 text-[var(--native-text-color)] rounded-full">*/}
          {/*          Сериал*/}
          {/*        </div>*/}
          {/*        <div className="bg-[var(--native-secondary-bg-color)] px-2 py-0.5 rounded-full">*/}
          {/*          Ужасы*/}
          {/*        </div>*/}
          {/*        <div className="bg-[var(--native-secondary-bg-color)] px-2 py-0.5 rounded-full">*/}
          {/*          Фантастика*/}
          {/*        </div>*/}
          {/*        <div className="bg-[var(--native-secondary-bg-color)] px-2 py-0.5 rounded-full">*/}
          {/*          Триллер*/}
          {/*        </div>*/}
          {/*        <div className="bg-[var(--native-secondary-bg-color)] px-2 py-0.5 rounded-full">*/}
          {/*          Драма*/}
          {/*        </div>*/}
          {/*        <div className="bg-[var(--native-secondary-bg-color)] px-2 py-0.5 rounded-full">*/}
          {/*          Детектив*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </TabItem>*/}
          {/*</TabList>*/}

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
