import Image from "next/image";

interface Iprops {
  ranking: number;
  imageUrl: string;
  nickname: string;
  introduce: string;
  recordingTime: number;
  dubingCount: number;
}

export default function UserRankingListItem({
  ranking,
  imageUrl,
  nickname,
  introduce,
  recordingTime,
  dubingCount,
}: Iprops) {
  return (
    <div className="grid grid-cols-12 h-38 gap-8 ">
      <div className="text-14 text-dubblack col-span-2 flex items-center justify-center">
        {ranking}
      </div>
      <div className="flex justify-end">
        <Image src={imageUrl} alt={"profile"} width={38} height={38} />
      </div>
      <div className="col-span-7">
        <div className="text-14 text-dubblack">{nickname}</div>
        <div className="text-10 text-dubgray">{introduce}</div>
      </div>
      <div className="text-14 text-dubblack flex items-center">
        {recordingTime}
      </div>
      <div className="text-14 text-dubblack flex items-center">
        {dubingCount}
      </div>
    </div>
  );
}
