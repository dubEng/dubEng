import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import useCommunityDetailQuery from "@/apis/community/queries/useCommunityDetailQuery";

import Image from "next/image";
import ShortsTitle from "@/features/community/molecules/ShortsTitle";
import { AiFillProfile } from "react-icons/ai";
import profile_01 from "../../../../../public/images/dump/profile_01.svg";
import usePlayCountUpQuery from "@/apis/community/queries/usePlayCountUpQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

export default function ShortsProductPage() {
  const router = useRouter();

  //추후에 languageType도 같이 받아오면 좋을 듯!
  const { data } = useCommunityDetailQuery(
    router.query.id as string,
    "english"
  );

  const userId = useSelector((state: RootState) => state.user.userId);

  const [isPlayed, setIsPlayed] = useState<null | boolean>(null);
  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();

  const [selectedScript, setSelectedScript] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  function transferYoutube(videoPath: string) {
    const originalUrl = videoPath;
    const splitUrl = originalUrl.split("watch?v=");
    const transferVideoPath = splitUrl[1];
    return transferVideoPath;
  }

  // player 준비시 실행
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    const player = event.target;
    setYoutubePlayer(player);
    player.pauseVideo();
    player.mute();
  };

  const { data: playCountUp, refetch } = usePlayCountUpQuery(
    userId,
    Number(router.query.id),
    isPlayed
  );
  console.log("ddddddd", playCountUp);

  // const onPlay: YouTubeProps["onPlay"] = (event) => {
  //   console.log("onPlay");
  //   console.log("event", event);
  //   // if (audioRef.current) {
  //   //   audioRef.current.play();
  //   // }
  // };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    console.log("onStateChange");

    if (event.data === 1) {
      if (audioRef.current) {
        audioRef.current.play();
      }
      setIsPlayed(true);
      console.log("현재 IsPlayed", isPlayed);
      // 재생 중일 때
      console.log("영상 재생");
      refetch();
    } else if (event.data === 2) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      //일시 정지 시
      console.log("일시 정지");
    }
  };

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

  // // 1초마다 영상 실행 시간 가져오기
  useEffect(() => {
    const watchTime = setInterval(() => {
      const time = Math.floor(Number(youtubePlayer?.getCurrentTime()));

      console.log("time", time);

      //TODO: 21 -> endTime
      if (time == 0) {
        setSelectedScript(0);
      }

      const currentTimeSecond =
        data.scriptList[selectedScript]?.startTime / 1000;
      const nextTimeSecond =
        data.scriptList[selectedScript + 1]?.startTime / 1000;

      /* 실시간 하이라이팅 */
      // 선택된 스크립트의 idx값이 전체 스크립트의 길이보다 작고 time이 0 보다 크면 실행
      if (selectedScript < data.scriptList.length && time > 0) {
        // 해당 스크립트 리스트의 startTime이 undefined가 아니라면
        if (data.scriptList[selectedScript]?.startTime != undefined) {
          console.log("현재 시간", currentTimeSecond);
          console.log("다음 시간", nextTimeSecond);

          // 현재 재생되고 있는 영상의 시간이 현재 스크립트의 시작 시간보다 크거나 같고
          // 현재 재생되고 있는 영상의 시간이 다음 스크립트의 시작 시간보다 작거나 같다면
          // selectedScript를 증가하지 않고 넘어간다.
          if (currentTimeSecond <= time && time <= nextTimeSecond) {
            console.log("selectedScript", selectedScript);
            console.log("현재 스크립트가 재생중인 영상과 일치합니다.");
          }
          // 현재 선택된 스크립트의 시간보다 진행중인 시간이 더 크다면
          else if (time > currentTimeSecond) {
            console.log("다음 스크립트로 넘어가자");
            setSelectedScript(selectedScript + 1);
          }
        }
      }
    }, 500);

    return () => {
      clearInterval(watchTime);
    };
  });

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
      {data && (
        <>
          <div className="flex mb-8 flex flex-row mt-16 mb-16 items-center w-390 px-16">
            <Image
              src={data.profileImage ?? profile_01}
              alt="profileImage"
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="ml-4 text-dubgraymedium">{data.nickname}</p>
          </div>
          <YouTube
            videoId={transferYoutube(data.videoPath)}
            opts={{
              height: "221",
              width: "390",
              playerVars: {
                start: data.startTime,
                end: data.endTime,
                autoplay: 0,
                modestbranding: 0, // 컨트롤 바에 youtube 로고를 표시하지 않음
                controls: 0,
              },
            }}
            onReady={onPlayerReady}
            // onPlay={onPlay}
            onStateChange={onStateChange}
            onEnd={(e) => {
              youtubePlayer.pauseVideo();
              youtubePlayer.seekTo(data.startTime);

              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }

              setSelectedScript(0);
            }}
          />
          <audio
            ref={audioRef}
            style={{ display: "none" }}
            src={data.recordPath}
          />
          <div className="mt-16">
            <ShortsTitle
              userId={data.userId}
              title={data.title}
              playCount={playCountUp?.playCount}
              createdDate={data.createdDate}
              recordCommentCount={data.recordCommentCount}
              recordLikeCount={playCountUp?.likeCount}
              isLike={playCountUp?.like}
              isScrap={false}
            />
          </div>
          {/* <div className="flex flex-row justify-between mt-16 mb-16 items-center w-390 px-16">
            <p className="text-16 text-white">{data.title}</p>
            <div>

            </div>
          </div> */}
          <div className="h-250 pt-32 overflow-y-scroll bg-black container mx-auto mb-16 w-391 mt-15">
            {data.scriptList &&
              data.scriptList.map((item: any, index: number) => {
                if (index === selectedScript) {
                  return (
                    <div
                      className={`script-element-${index} mb-8 mx-20 flex flex-col items-center bg-dubblue`}
                      key={index}
                    >
                      <p className="text-16 text-white">{item.content}</p>
                      <p className="text-14 text-[#8E8D8D]">
                        {item.translateContent}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={`script-element-${index} mb-8 mx-20 flex flex-col items-center`}
                      key={index}
                    >
                      <p className="text-16 text-white">{item.content}</p>
                      <p className="text-14 text-[#8E8D8D]">
                        {item.translateContent}
                      </p>
                    </div>
                  );
                }
              })}
          </div>
        </>
      )}
    </div>
  );
}
