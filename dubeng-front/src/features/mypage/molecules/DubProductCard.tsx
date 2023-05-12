import Image from "next/image";

interface Iprops {
  title: string;
  thumbnail: string;
  playCount: number;
  updatedDate: string;
}

export default function DubProductCard({
  title,
  thumbnail,
  playCount,
  updatedDate,
}: Iprops) {
  return (
    <div className="p-16 w-272 h-211 flex flex-col rounded-16 bg-dubgraylight border-1 border-dubgraymedium">
      <Image
        src={thumbnail}
        alt="thumbnail"
        width={240}
        height={152}
        className="rounded-8"
      />
      <p className="text-16 text-dubblack font-semibold">{title}</p>
      <div className="flex items-center space-x-4">
        <p className="text-14 text-dubgray">조회수 {playCount}</p>
        <p className="text-10 text-dubgray"> ▪ </p>
        <p className="text-14 text-dubgray">{updatedDate}분 전</p>
      </div>
    </div>
  );
}
