import Image from "next/image";

import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

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
  timeago.register("ko", koLocale);

  return (
    <div className="pl-16 pr-16 pt-16 pb-10 w-272 h-211 flex flex-col rounded-16 bg-dubgraylight border-1 border-dubgraymedium">
      <Image
        src={thumbnail}
        alt="thumbnail"
        width={240}
        height={152}
        className="rounded-8 bg-dubgray"
      />
      <p className="mt-8 text-16 text-dubblack font-semibold">{title}</p>
      <div className="flex items-center space-x-4">
        <p className="text-14 text-dubgray">조회수 {playCount}회</p>
        <p className="text-10 text-dubgray"> ▪ </p>
        <TimeAgo
          datetime={updatedDate}
          locale="ko"
          className="text-14 text-dubgray"
        />
      </div>
    </div>
  );
}
