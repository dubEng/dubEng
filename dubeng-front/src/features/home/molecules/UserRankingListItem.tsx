import { UserRanking } from "@/types/UserRanking";
import Image from "next/image";

export default function UserRankingListItem({
  ranking,
  imageUrl,
  nickname,
  introduce,
  recordingTime,
  dubingCount,
}: UserRanking) {
  return (
    <div className="grid grid-cols-12 h-38 gap-8 mb-16">
      <div className="text-14 text-dubblack col-span-2 flex items-center justify-center">
        {ranking}
      </div>
      <div className="flex justify-end">
        <Image src={imageUrl} alt={"profile"} width={38} height={38} className="rounded-md" />
      </div>
      <div className="col-span-5">
        <div className="text-14 text-dubblack">{nickname}</div>
        <div className="text-10 text-dubgray">{introduce}</div>
      </div>
      <div className="text-14 text-dubblack flex items-center justify-center col-span-2">
        {recordingTime}
      </div>
      <div className="text-14 text-dubblack flex items-center justify-center col-span-2">
        {dubingCount}
      </div>
    </div>
  );
}
