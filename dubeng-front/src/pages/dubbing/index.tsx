
import DubBox from "@/features/dubbing/organism/DubBox";
import { Script } from "@/types/Script";
import { useState, useEffect } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

export default function DubbingPage() {
  const [url, setUrl] = useState<string>(
    "https://www.youtube.com/watch?v=YXOUOOtfTBs"
  );

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();

  const [selectedScript, setSelectedScript] = useState<number>(0);

  const [scriptList, setScriptList] = useState<Script[]>([
    {
      id: 1,
      startTime: 1000,
      duration: 3000,
      content: "Oh, my God. He's..",
      translateContent: "오, 맙소사. 그는..",
    },
    {
      id: 2,
      startTime: 4000,
      duration: 4000,
      content: "Look at the way he's just staring at me.",
      translateContent: "그가 나를 쳐다보는 것 좀 봐",
    },
    {
      id: 3,
      startTime: 8000,
      duration: 3000,
      content: "I think he's tryin' to mouth something at me",
      translateContent: "그가 나에게 뭔가를 말하려고 하는 것 같아",
    },
    {
      id: 4,
      startTime: 11000,
      duration: 2500,
      content: "but I can't make it out.",
      translateContent: "하지만 이해할 수가 없어",
    },
    {
      id: 8,
      startTime: 13500,
      duration: 2500,
      content: "Okay, dinner's ready.",
      translateContent: "좋아요, 저녁 준비됐어요.",
    },
    {
      id: 9,
      startTime: 16000,
      duration: 2000,
      content: "Good game.",
      translateContent: "좋은 게임입니다",
    },
    {
      id: 10,
      startTime: 18000,
      duration: 3000,
      content: "Yeah, solid effort, solid effort",
      translateContent: "그래, 노력이 가상하지.",
    },
  ]);

  // 재생할 Video의 ID값
  const [videoId, setVideoId] = useState<string>("YXOUOOtfTBs");

  // player 준비시
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    const player = event.target;
    setYoutubePlayer(player);
  };

  // 유튜브 해당 시간으로 이동
  // youtubePlayer?.seekTo(startTime);

  // const onPlayerReady: YouTubeProps["onReady"] = (event) => {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
      modestbranding: 0, // 컨트롤 바에 youtube 로고를 표시하지 않음
      controls: 0,
    },
  };
  function moveVideoTime(startTime: number) {
    youtubePlayer.seekTo(startTime);
  }

  const getIframeUrl = (url: string, start: number, end: number) => {
    const originalUrl = url;
    const splitUrl = originalUrl.split("watch?v=");
    const newUrl =
      splitUrl[0] +
      "embed/" +
      splitUrl[1] +
      "?start=" +
      start +
      "&end=" +
      end +
      "&controls=0&autoplay=1&loop=1";

    console.log("newUrl", newUrl);
    return newUrl;
  };

  return (
    <>
      <button onClick={() => moveVideoTime(15)}>영상 시간 이동</button>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onPlayerReady}
        onEnd={(e) => {
          e.target.stopVideo(0);
        }}
      />
      <DubBox />
      <div className="h-156 overflow-y-scroll bg-dubgraylight mb-32">
        <p className="flex justify-start mx-16 text-16 font-bold mt-16 mb-8">
          전체 스크립트
        </p>
        {scriptList.map((item: Script) => (
          <div className="script-element mb-8 mx-20">
            <p className="text-14 text-dubblack">{item.content}</p>
            <p className="text-14 text-dubgray">{item.translateContent}</p>
          </div>
        ))}
      </div>
      <div>
        ㅇㅇ?
      </div>
    </>
  );
}
