import Image from "next/image";

export interface SmallContentCardProps {
  title: string,
  genres: string,
  imageSrc: string,
}


const SmallContentCard: React.FC<SmallContentCardProps> = ({ title, genres, imageSrc }) => {
  return (
    <div
      className="flex flex-col gap-0.5 p-1.5 bg-[var(--native-secondary-bg-color)]
      min-h-64 rounded-xl border border-[var(--additional-hint-fill)] drop-shadow-md">
      <div className="relative w-full h-52">
        <Image fill className="object-cover rounded-xl" src={imageSrc} alt="Conent image"/>
      </div>
      <span className="font-[family-name:var(--font-subheader)] text-md">
        {title}
      </span>
      <span className="font-[family-name:var(--font-text)] text-[var(--native-hint-color)] text-xs">
        {genres}
      </span>
    </div>
  );
}

export default SmallContentCard;
