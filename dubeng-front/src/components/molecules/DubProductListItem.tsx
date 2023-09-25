import Image from "next/image";
import Link from "next/link";

import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import profile_01 from "../../../public/images/default/mic_profile.png";

interface Iprops {
  id?: number;
  recordId: number;
  title: string;
  thumbnail: string;
  runtime?: number;
  profileImage?: string;
  nickname?: string;
  playCount: number;
  updatedDate?: string;
}

export default function DubProductListItem({
  id,
  recordId,
  title,
  thumbnail,
  runtime,
  profileImage,
  nickname,
  playCount,
  updatedDate,
}: Iprops) {
  timeago.register("ko", koLocale);

  function secondsToMinutes(runtime: number) {
    const minutes = Math.floor(runtime / 60);
    const remainingSeconds = runtime % 60;
    return [minutes, remainingSeconds];
  }

  // const runtimeList = secondsToMinutes(runtime);

  return (
    <Link href={`/community/shorts/product/${recordId}`}>
      <div className="flex flex-row space-x-16 p-16 w-full mb-16 bg-white rounded-8 border-1 border-dubgraymedium">
        <div className="relative rounded-4 min-w-161 min-h-96 max-w-161 max-h-96">
          <Image src={thumbnail} alt={title} fill className="rounded-4" />
        </div>
        <div className="w-full flex flex-col justify-start">
          <p className="leading-18 break-words text-14 font-semibold text-dubblack line-clamp-2 ">
            {title}
          </p>
          {runtime ? (
            secondsToMinutes(runtime)[0] === 0 ? (
              <p className="text-dubgray text-12">
                영상 길이 : {secondsToMinutes(runtime)[1]}초
              </p>
            ) : (
              <p className="text-dubgray text-12">
                영상 길이 : {secondsToMinutes(runtime)[0]}분{" "}
                {secondsToMinutes(runtime)[1]}초
              </p>
            )
          ) : null}
          {nickname ? (
            <div className="flex items-center">
              <div className="flex justify-end">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt={"profile"}
                    width={16}
                    height={16}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src={profile_01}
                    alt={"profile"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
              </div>
              <p className="pl-4 text-dubgray text-12">{nickname}</p>
            </div>
          ) : null}
          <p className="flex text-dubgray text-12 space-x-4 mt-4">
            <p>조회수 {playCount}회</p>
            <p className="text-8">▪</p>
            {updatedDate ? (
              <TimeAgo datetime={updatedDate} locale="ko" />
            ) : null}
          </p>
        </div>
      </div>
    </Link>
  );
}
