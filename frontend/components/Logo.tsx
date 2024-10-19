import Image from "next/image";
import KangarooLogo from "@/public/static/icons/kangaroo.svg";

export const logoSizes = ["xl", "lg"];

export type LogoSize = typeof logoSizes[number];

interface LogoProps {
  size?: LogoSize,
}


const Logo: React.FC<LogoProps> = ({ size = logoSizes[0] }) => {
  const textClass = (size == "xl" ? "text-6xl" : "text-5xl");
  const logoSize = (size == "xl"? 64 : 48)
  const kangarooMargin = (size == "xl"? "0 -1.5rem" : "0 -1.25rem")

  return (
    <div className="flex justify-center">
      <h1 className={`font-[family-name:var(--font-header)] ${textClass}`}>Kin</h1>
      <Image width={logoSize} height={logoSize} src={KangarooLogo} alt="Logo" style={{margin: kangarooMargin}}/>
      <h1 className={`font-[family-name:var(--font-header)] ${textClass}`}>Guru</h1>
    </div>
  );
}

export default Logo;
