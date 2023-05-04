import PitchGraph from "@/features/dubbing/atoms/PitchGraph";
import DubBox from "@/features/dubbing/organism/DubBox";
import { Script } from "@/types/Script";
import { useState, useEffect } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

export default function DubbingPage() {
  const [url, setUrl] = useState<string>(
    "https://www.youtube.com/watch?v=YXOUOOtfTBs"
  );

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();

  const [nowPlaying, setNowPlaying] = useState<boolean>(false);

  const [selectedScript, setSelectedScript] = useState<number>(0);

  const [scriptList, setScriptList] = useState<Script[]>([
    {
      id: 1,
      startTime: 1,
      duration: 3,
      content: "Oh, my God. He's..",
      translateContent: "오, 맙소사. 그는..",
    },
    {
      id: 2,
      startTime: 4,
      duration: 4,
      content: "Look at the way he's just staring at me.",
      translateContent: "그가 나를 쳐다보는 것 좀 봐",
    },
    {
      id: 3,
      startTime: 8,
      duration: 3,
      content: "I think he's tryin' to mouth something at me",
      translateContent: "그가 나에게 뭔가를 말하려고 하는 것 같아",
    },
    {
      id: 4,
      startTime: 11,
      duration: 25,
      content: "but I can't make it out.",
      translateContent: "하지만 이해할 수가 없어",
    },
    {
      id: 5,
      startTime: 13,
      duration: 25,
      content: "Okay, dinner's ready.",
      translateContent: "좋아요, 저녁 준비됐어요.",
    },
    {
      id: 6,
      startTime: 16,
      duration: 2,
      content: "Good game.",
      translateContent: "좋은 게임입니다",
    },
    {
      id: 7,
      startTime: 18,
      duration: 3,
      content: "Yeah, solid effort, solid effort",
      translateContent: "그래, 노력이 가상하지.",
    },
  ]);

  // 재생할 Video의 ID값
  const [videoId, setVideoId] = useState<string>("YXOUOOtfTBs");

  // 선택된 스크롤이 바뀌면 오토 스크롤
  useEffect(() => {
    if (
      document.querySelector<HTMLElement>(`.script-element-${selectedScript}`)
    ) {
      const element = document.querySelector<HTMLElement>(
        `.script-element-${selectedScript}`
      );
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedScript]);

  // 1초마다 영상 실행 시간 가져오기
  useEffect(() => {
    const watchTime = setInterval(() => {
      console.log("Interval");

      // 영상이 재생중일 때만 실행
      if (nowPlaying) {
        const time = Math.floor(Number(youtubePlayer?.getCurrentTime()));

        //TODO: 21 -> endTime
        if (time == 0) {
          setSelectedScript(0);
        }

        console.log("현재 선택된 스크립트", selectedScript);
        console.log("time", time);

        /* 실시간 하이라이팅 */
        // flag가 false이거나 선택된 스크립트의 idx값이 전체 스크립트의 길이보다 작으면 실행
        if (selectedScript < scriptList.length && time > 0) {
          // 해당 스크립트 리스트의 startTime이 undefined가 아니라면
          if (scriptList[selectedScript]?.startTime != undefined) {
            console.log(
              "현재 스크립트 startTime",
              scriptList[selectedScript]?.startTime
            );
            console.log(
              "다음 startTime",
              scriptList[selectedScript + 1]?.startTime
            );
            // 현재 재생되고 있는 영상의 시간이 현재 스크립트의 시작 시간보다 크거나 같고
            // 현재 재생되고 있는 영상의 시간이 다음 스크립트의 시작 시간보다 작거나 같다면
            // selectedScript를 증가하지 않고 넘어간다.
            if (
              scriptList[selectedScript]?.startTime <= time &&
              time <= scriptList[selectedScript + 1]?.startTime
            ) {
              console.log("현재 스크립트가 재생중인 영상과 일치합니다.");
            } else {
              console.log("다음 스크립트로 넘어가자");
              setSelectedScript(selectedScript + 1);
            }
          }
        }
        console.log("-------------------------------------------");
      }
    }, 1000);

    return () => {
      clearInterval(watchTime);
    };
  });


  function moveScroll() {
    if (document.querySelector<HTMLElement>(".script-element-3")) {
      const element = document.querySelector<HTMLElement>(".script-element-3");
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  const opts: YouTubeProps["opts"] = {
    height: "218",
    width: "390",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
      modestbranding: 0, // 컨트롤 바에 youtube 로고를 표시하지 않음
      controls: 0,
    },
  };

  // player 준비시 실행
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    const player = event.target;
    setYoutubePlayer(player);
  };

  const onPlay: YouTubeProps["onPlay"] = (event) => {
    console.log("onPlay");
    console.log("event", event);
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    console.log("onStateChange");

    if (event.data === 1) {
      // 재생 중일 때
      setNowPlaying(true);
    } else if (event.data === 2 || event.data === 0) {
      //영상이 종료되거나, 일시 정지 시
      setNowPlaying(false);
    }
  };

  function moveVideoTime(startTime: number) {
    youtubePlayer.seekTo(startTime);
  }

  return (
    <>
      <button onClick={() => moveVideoTime(15)}>영상 시간 이동</button>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onPlayerReady}
        onEnd={(e) => {
          e.target.stopVideo(0);
          setSelectedScript(0);
        }}
        onPlay={onPlay}
        onStateChange={onStateChange}
      />
      <PitchGraph />
      {/* <DubBox /> */}
      <button onClick={moveScroll}>스크립트 스크롤</button>
      <div className="h-156 overflow-y-scroll bg-dubgraylight mb-32">
        <p className="flex justify-start mx-16 text-16 font-bold mt-16 mb-8">
          전체 스크립트
        </p>

        {scriptList.map((item: Script) => {
          if (item.id === selectedScript) {
            return (
              <div
                className={`script-element-${item.id} mb-8 mx-20 bg-dubblue`}
                key={item.id}
              >
                <p className="text-14 text-dubblack">{item.content}</p>
                <p className="text-14 text-dubgray">{item.translateContent}</p>
              </div>
            );
          } else {
            return (
              <div
                className={`script-element-${item.id} mb-8 mx-20`}
                key={item.id}
              >
                <p className="text-14 text-dubblack">{item.content}</p>
                <p className="text-14 text-dubgray">{item.translateContent}</p>
              </div>
            );
          }
        })}
      </div>
      <div>ㅇㅇ?</div>
    </>
  );
}
