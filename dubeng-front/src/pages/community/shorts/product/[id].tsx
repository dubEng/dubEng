import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import useCommunityDetailQuery from "@/apis/community/queries/useCommunityDetailQuery";

import Image from "next/image";
import ShortsTitle from "@/features/community/molecules/ShortsTitle";
import DefaultImage from "../../../../../public/images/default/mic_profile.png";
// import usePlayCountUpQuery from "@/apis/community/queries/usePlayCountUpQuery";
import useViewCountQuery from "@/apis/community/queries/useViewCountQuery";
import useLikeInfoQuery from "@/apis/community/queries/useLikeInfoQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { LangType } from "@/enum/statusType";
import Link from "next/link";
import DubScriptListItem from "@/components/molecules/DubScriptListItem";
import Head from "next/head";

export default function ShortsProductPage() {
  const router = useRouter();

  const langType = useSelector(
    (state: RootState) => state.languageTab.langType
  );

  const userId = useSelector((state: RootState) => state.user.userId);

  const { data } = useCommunityDetailQuery(router.query.id as string);

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();

  const [selectedScript, setSelectedScript] = useState<number>(0);

  // const [notYetPlayed, setNotYetPlayed] = useState(true);
  const [oncePlayed, setOncePlayed] = useState(false);

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

  // const { data: playCountUp, refetch } = usePlayCountUpQuery(
  //   userId,
  //   Number(router.query.id)
  // );

  const { data: playCountUp, refetch } = useViewCountQuery(
    Number(router.query.id)
    // !notYetPlayed
  );

  const { data: likeInfo } = useLikeInfoQuery(Number(router.query.id), userId);

  console.log("라이크인포", likeInfo);
  // const playCountRef = useRef<number | null>(null);

  // useEffect(() => {
  //   if (playCountUp !== undefined && playCountRef.current === null) {
  //     playCountRef.current = playCountUp.playCount;
  //   }
  // }, [playCountUp]);

  const [nowPlayCount, setNowPlayCount] = useState<number>();

  const onPlay: YouTubeProps["onPlay"] = (event) => {
    // console.log("onPlay");
    // console.log("event", event);
    // if (audioRef.current) {
    //   audioRef.current.play();
    // }
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    // console.log("onStateChange");

    if (event.data === 1) {
      if (audioRef.current) {
        audioRef.current.play();
        // 재생 중일 때
        console.log("영상 재생");
        // refetch();
      }
      if (oncePlayed) {
        console.log("한번 재생 종료되고 나서 다시 재생한 것");
        refetch();
        setOncePlayed(false);
      }
    } else if (event.data === 2) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      //일시 정지 시
      // console.log("일시 정지");
    } else if (event.data == 0) {
      setOncePlayed(true);
    }
  };

  // useEffect(() => {
  //   setNotYetPlayed(false);
  // }, []);

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
          // 현재 재생되고 있는 영상의 시간이 현재 스크립트의 시작 시간보다 크거나 같고
          // 현재 재생되고 있는 영상의 시간이 다음 스크립트의 시작 시간보다 작거나 같다면
          // selectedScript를 증가하지 않고 넘어간다.
          if (currentTimeSecond <= time && time <= nextTimeSecond) {
            // console.log("현재 스크립트가 재생중인 영상과 일치합니다.");
          }
          // 현재 선택된 스크립트의 시간보다 진행중인 시간이 더 크다면
          else if (time > currentTimeSecond) {
            // console.log("다음 스크립트로 넘어가자");
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
    <div className="w-full h-screen bg-black flex flex-col items-center justify-start">
      <Head>
        <title>더빙으로 배우는 영어 쉐도잉 서비스 - 더빙 작품</title>
        <meta
          name="description"
          content="더빙으로 배우는 영어 쉐도잉 서비스, 다른 사람이 더빙한 영상을 확인할 수 있습니다."
        />
        <meta
          http-equiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
      </Head>
      {data && (
        <>
          <Link href={`/mypage/${data.userId}`}>
            <div className="flex flex-row mt-16 mb-16 items-center w-screen px-16">
              <Image
                src={data.profileImage ?? DefaultImage}
                alt="profileImage"
                width={24}
                height={24}
                className="rounded-full"
              />
              <p className="ml-4 text-dubgraymedium">{data.nickname}</p>
            </div>
          </Link>
          <YouTube
            videoId={transferYoutube(data.videoPath)}
            opts={{
              height: "221",
              width: "325",
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
              // playCount={playCountRef.current as number}
              // playCount={likeInfo?.playCount}
              playCount={playCountUp}
              createdDate={data.createdDate}
              recordCommentCount={data.recordCommentCount}
              // recordLikeCount={playCountUp?.likeCount}
              recordLikeCount={likeInfo?.likeCnt}
              // isLike={playCountUp?.isLike}
              isLike={likeInfo?.like}
              isScrap={false}
            />
          </div>
          <div className="h-200 pt-32 scrollbar-hide overflow-y-scroll bg-black container mx-auto mb-16 w-screen mt-15">
            {data.scriptList &&
              data.scriptList.map((item: any, index: number) => {
                if (index === selectedScript) {
                  return (
                    <DubScriptListItem
                      key={index}
                      index={index}
                      content={item.content}
                      isSelected={true}
                      langType={langType}
                      translateContent={item.translateContent}
                    />
                  );
                } else {
                  return (
                    <DubScriptListItem
                      key={index}
                      index={index}
                      content={item.content}
                      isSelected={false}
                      langType={langType}
                      translateContent={item.translateContent}
                    />
                  );
                }
              })}
          </div>
        </>
      )}
    </div>
  );
}
