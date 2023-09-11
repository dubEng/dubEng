import Link from "next/link";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import ShortsTitle from "../molecules/ShortsTitle";
import DefaultImage from "../../../../public/images/default/mic_profile.png";

interface IProps {
  userId: string;
  profileImage: string;
  nickname: string;
  videoPath: string;
  startTime: number;
  endTime: number;
  audioPath: string;
  title: string;
  createdDate: number;
  recordCommentCount: number;
}

export default function ShortsComponent({
  userId,
  profileImage,
  nickname,
  videoPath,
  startTime,
  endTime,
  audioPath,
  title,
  createdDate,
  recordCommentCount,
}: IProps) {
  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();
  const audioRef = useRef<HTMLAudioElement>(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    const player = event.target;
    setYoutubePlayer(player);
    player.mute();

    // player 크기 조정 예: 화면 크기에 맞게 조정
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    console.log('screenWidth', screenWidth);
    console.log('screenHeight', screenHeight);

    player.setSize(screenWidth - 8, 174);
  };

  const onPlay: YouTubeProps["onPlay"] = (event) => {
    // const player = event.target;
    // setYoutubePlayer(player);
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    console.log("👤onStateChange");
    event.target.mute();
    // player.mute()

    if (event.data === 1) {
      // event.target.seekTo(contentList[currentPage].startTime);
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else if (event.data === 2) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  function processVideoPath(videoPath: string) {
    const originalUrl = videoPath;
    const splitUrl = originalUrl.split("watch?v=");
    const processedVideoPath = splitUrl[1];
    return processedVideoPath;
  }

  return (
    <div className="w-screen h-[calc(100%-61px)] rounded-16 bg-black flex flex-col items-center justify-center">
      <>
        <Link href={`/mypage/${userId}`}>
          <div className="flex flex-row mt-16 mb-16 items-center w-screen px-16">
            <Image
              src={profileImage ?? DefaultImage}
              alt="profileImage"
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="ml-4 text-dubgraymedium">{nickname}</p>
          </div>
        </Link>
        <YouTube
          videoId={processVideoPath(videoPath)}
          opts={{
            height: "221",
            width: "325",
            playerVars: {
              start: startTime,
              end: endTime,
              autoplay: 0,
              modestbranding: 0, //컨트롤 바에 youtube 로고를 표시하지 않음
              controls: 0,
            },
          }}
          onReady={onPlayerReady}
          onPlay={onPlay}
          onStateChange={onStateChange}
          onEnd={(e) => {
            youtubePlayer.pauseVideo();
            youtubePlayer.seekTo(startTime);

            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
          }}
        />
        <audio
          controls={true}
          ref={audioRef}
          style={{ display: "none" }}
          src={audioPath}
        />
        <div className="mt-16 w-screen px-8">
          <ShortsTitle
            userId={userId}
            title={title}
            createdDate={createdDate}
            recordCommentCount={recordCommentCount}
            isScrap={false}
          />
        </div>
      </>
    </div>
  );
}
