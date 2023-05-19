import { UserRanking } from "@/types/UserRanking";
import Image from "next/image";
import DefaultImage from "../../../../public/images/default/mic_profile.png";
import Link from "next/link";

export default function UserRankingListItem({
  userId,
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
        <Link href={`/mypage/${userId}`}>
          <div className="flex flex-col ">
            <p className="text-14 text-dubblack">{nickname}</p>
            <p className="text-10 text-dubgray">{introduce}</p>
          </div>
        </Link>
      </div>
      <div className="text-14 text-dubblack flex items-center justify-center col-span-2">
        {recordingTime}초
      </div>
      <div className="text-14 text-dubblack flex items-center justify-center col-span-2">
        {dubingCount}
      </div>
    </div>
  );
}
