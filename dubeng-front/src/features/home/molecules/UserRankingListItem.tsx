import { UserRanking } from "@/types/UserRanking";
import Image from "next/image";
import DefaultImage from "../../../../public/images/default/mic_profile.png";

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
      <div className="text-14 text-dubblack col-span-1 flex items-center justify-center">
        {ranking + 1}
      </div>
      <div className="grid col-span-2 justify-items-end">
        <Image
          src={imageUrl ?? DefaultImage}
          alt={"profile"}
          width={38}
          height={38}
          className="rounded-md"
        />
      </div>
      <div className="col-span-5 space-y-10">
        <div className="flex flex-col ">
          <p className="text-14 text-dubblack">{nickname}</p>
          <p className="text-10 text-dubgray">{introduce}</p>
        </div>
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
