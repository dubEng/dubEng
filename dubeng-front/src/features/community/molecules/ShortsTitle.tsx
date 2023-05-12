import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { MdFavoriteBorder, MdMoreHoriz } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { MdOutlineModeComment } from "react-icons/md";
import DubProductTaskButton from "./DubProductTaskButton";
import CommentTaskButton from "./CommentTaskButton";

import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

interface Iprops {
  userId: string;
  title: string;
  playCount: number;
  createdDate: number;
  recordCommentCount: number;
  recordLikeCount: number;
  isLike: boolean;
  isScrap: boolean;
}

export default function ShortsTitle({
  userId,
  title,
  playCount,
  createdDate,
  recordCommentCount,
  recordLikeCount,
  isLike,
  isScrap,
}: Iprops) {
  timeago.register("ko", koLocale);

  const userIdData = useSelector((state: RootState) => state.user.userId);
  const [isTaskButtonOpen, setIsTaskButtonOpen] = useState(false);

  function handleTaskButton() {
    console.log("댓글 작업 버튼 눌렀다!");
    setIsTaskButtonOpen(!isTaskButtonOpen);
    console.log(isTaskButtonOpen);
  }

  if (userIdData === userId) {
    return (
      <div className="bg-black w-358">
        <div className="flex items-center justify-between">
          <p className="text-16 text-dubgraylight">{title}</p>
          <div className="flex text-14 text-dubgraylight space-x-8">
            <div className="flex space-x-2">
              {isLike ? (
                <MdFavorite size={20} className="text-dubcoral" />
              ) : (
                <MdFavoriteBorder size={20} />
              )}
              <p>{recordLikeCount}</p>
            </div>
            <div className="flex space-x-1">
              <MdOutlineModeComment size={20} />
              <p>{recordCommentCount}</p>
            </div>
          </div>
        </div>
        <div className="flex mt-4 text-14 text-dubgray space-x-4">
          <p>조회수 {playCount}회</p>
          <p>▪</p>
          <TimeAgo datetime={createdDate} locale="ko" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-black w-358">
        <div className="flex items-center justify-between">
          <p className="text-16 text-dubgraylight">{title}</p>
          <div className="flex text-14 text-dubgraylight space-x-8">
            <div className="flex space-x-2">
              {isLike ? (
                <MdFavorite size={20} className="text-dubcoral" />
              ) : (
                <MdFavoriteBorder size={20} />
              )}
              <p>{recordLikeCount}</p>
            </div>
            <div className="flex space-x-1">
              <MdOutlineModeComment size={20} />
              <p>{recordCommentCount}</p>
            </div>
            <div>
              <MdMoreHoriz
                className="absolute top-0 right-0 text-dubgraylight cursor-pointer"
                size={24}
                onClick={handleTaskButton}
              />
              <div className="absolute right-0 top-24">
                {isTaskButtonOpen && <DubProductTaskButton />}
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-4 text-14 text-dubgray space-x-4">
          <p>조회수 {playCount}회</p>
          <p>▪</p>
          <p>{createdDate}분 전</p>
        </div>
      </div>
    );
  }
}
