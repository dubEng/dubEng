import Image from "next/image";

import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

interface Iprops {
  title: string;
  thumbnail: string;
  playCount: number;
  updatedDate: string;
  nickname?: string;
  userProfileImg?: string;
}

export default function DubProductCard({
  title,
  thumbnail,
  playCount,
  updatedDate,
  nickname,
  userProfileImg,
}: Iprops) {
  timeago.register("ko", koLocale);

  return (
    <div className="pl-16 pr-16 pt-16 pb-10 w-full h-200 flex flex-col rounded-16 bg-dubgraylight border-1 border-dubgraymedium">
      <div className="w-full aspect-video relative">
        <Image
          src={thumbnail}
          alt="thumbnail"
          fill
          className="rounded-8 bg-dubgray"
        />
      </div>
      <p className="mt-8 text-16 text-dubblack font-semibold line-clamp-1">
        {title}
      </p>
      <div className="flex items-center space-x-4">
        {userProfileImg ? (
          <Image
            src={userProfileImg}
            alt="userProfileImg"
            width={16}
            height={16}
            className="w-16 h-16 rounded-full"
          />
        ) : null}
        {nickname ? (
          <p className="text-14 text-dubgray mr-16 text-ellipsis overflow-hidden whitespace-nowrap max-w-50">
            {nickname} |
          </p>
        ) : null}
        <p className="text-14 text-dubgray text-ellipsis overflow-hidden whitespace-nowrap max-w-50">
          조회수 {playCount}회
        </p>
        <p className="text-10 text-dubgray"> ▪ </p>
        {updatedDate ? (
          <TimeAgo
            datetime={updatedDate}
            locale="ko"
            className="text-14 text-dubgray text-ellipsis overflow-hidden whitespace-nowrap max-w-50"
          />
        ) : null}
      </div>
    </div>
  );
}
