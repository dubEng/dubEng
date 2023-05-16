import { useEffect, useState } from "react";
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
import DubVideoSlider from "@/components/organism/DubVideoSlider";
import CommentSlider from "../organism/CommentSlider";
import { useRouter } from "next/router";
import useLikePost from "@/apis/community/mutations/useLikePost";

interface Iprops {
  userId: string;
  title: string;
  playCount?: number;
  createdDate: number;
  recordCommentCount: number;
  recordLikeCount?: number;
  isLike?: boolean;
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
  // const [isTaskButtonOpen, setIsTaskButtonOpen] = useState(false);
  const [isCommentSliderOpen, setIsCommentSliderOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(isLike);
  const [presentLikeCount, setPresentLikeCount] = useState(recordLikeCount);
  const [changedLike, setChangedLike] = useState(false);

  const router = useRouter();
  const recordId = Number(router.query.id);

  // function handleTaskButton() {
  //   console.log("댓글 작업 버튼 눌렀다!");
  //   setIsTaskButtonOpen(!isTaskButtonOpen);
  //   console.log(isTaskButtonOpen);
  // }

  const { data, mutate, isSuccess, isError, mutateAsync } = useLikePost();

  function handleCommentButton() {
    console.log("댓글 버튼 누름");
    setIsCommentSliderOpen(true);
  }

  const handleLikeButton = () => {
    setChangedLike(true);
    console.log("하트 누름", isLiked);
    if (isLiked) {
      setIsLiked(!isLiked);
      setPresentLikeCount(presentLikeCount! - 1);
    } else {
      setIsLiked(!isLiked);
      setPresentLikeCount(presentLikeCount! + 1);
    }

    mutate({ recordId: recordId, userId: userIdData });
  };

  if (userIdData !== userId) {
    return (
      <div className="bg-black w-358">
        <div className="flex items-center justify-between">
          <p className="text-16 text-dubgraylight">{title}</p>
          <div className="flex text-14 text-dubgraylight space-x-8">
            {isLiked ? (
              <button className="flex space-x-4" onClick={handleLikeButton}>
                <MdFavorite size={20} className="text-dubcoral" />
              </button>
            ) : (
              <button className="flex space-x-4" onClick={handleLikeButton}>
                <MdFavoriteBorder size={20} />
              </button>
            )}
            <p>{changedLike ? presentLikeCount : recordLikeCount}</p>
            <button className="flex space-x-4" onClick={handleCommentButton}>
              <MdOutlineModeComment size={20} />
            </button>
            <p>{recordCommentCount}</p>
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
            {isLiked ? (
              <button className="flex space-x-4" onClick={handleLikeButton}>
                <MdFavorite size={20} className="text-dubcoral" />
              </button>
            ) : (
              <button className="flex space-x-4" onClick={handleLikeButton}>
                <MdFavoriteBorder size={20} />
              </button>
            )}
            <p>{changedLike ? presentLikeCount : recordLikeCount}</p>
            <button className="flex space-x-4" onClick={handleCommentButton}>
              <MdOutlineModeComment size={20} />
            </button>
            <p>{recordCommentCount}</p>
            {/* <div className="relative">
              <MdMoreHoriz
                className="absolute top-0 right-0 text-dubgraylight cursor-pointer"
                size={24}
                onClick={handleTaskButton}
              />
              <div className="absolute right-0 top-24">
                {isTaskButtonOpen && <DubProductTaskButton />}
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex mt-4 text-14 text-dubgray space-x-4">
          <p>조회수 {playCount}회</p>
          <p>▪</p>
          <TimeAgo datetime={createdDate} locale="ko" />
        </div>
        <CommentSlider
          isCommentSliderOpen={isCommentSliderOpen}
          setIsCommentSliderOpen={setIsCommentSliderOpen}
        />
      </div>
    );
  }
}
