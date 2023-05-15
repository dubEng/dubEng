import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import Image from "next/image";
import { MdMoreHoriz } from "react-icons/md";

import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

interface Iprops {
  userId: string;
  nickName: string;
  userImage: string;
  content: string;
  updatedDate: string;
}

export default function CommentListItem({
  userId,
  nickName,
  userImage,
  content,
  updatedDate,
}: Iprops) {
  timeago.register("ko", koLocale);
  const userIdData = useSelector((state: RootState) => state.user.userId);

  if (userIdData !== userId) {
    return (
      <div className="flex w-full space-x-8">
        <Image
          className="rounded-full min-h-40 min-w-40 mt-4"
          src={userImage}
          alt="userImage"
          width={40}
          height={40}
        ></Image>
        <div className="relative space-y-1">
          <div className="flex items-center space-x-4">
            <p className="text-16 text-dubblack font-bold">{nickName}</p>
            <TimeAgo
              datetime={updatedDate}
              locale="ko"
              className="text-12 text-dubgray"
            />
            <button className="absolute right-4">
              <MdMoreHoriz className="right-0 text-dubblack" size={24} />
            </button>
          </div>
          <div>
            <p className="text-14 text-dubblack">{content}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-full space-x-8 border-1 border-black">
        <Image
          className="rounded-full max-h-40 mt-4"
          src={userImage}
          alt="userImage"
          width={40}
          height={40}
        ></Image>
        <div className="space-y-1">
          <div className="flex items-center space-x-4">
            <p className="text-16 text-dubblack font-bold">{nickName}</p>
            <TimeAgo
              datetime={updatedDate}
              locale="ko"
              className="text-12 text-dubgray"
            />
          </div>
          <div>
            <p className="text-14 text-dubblack">{content}</p>
          </div>
        </div>
      </div>
    );
  }
}
