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
import { LangType } from "@/enum/statusType";

import ReactFullpage from "@fullpage/react-fullpage";

type Credits = {
  enabled?: boolean;
  label?: string;
  position?: "left" | "right";
};

const pluginWrapper = () => {
  /*
   * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
   */
};

export default function ShortsProductPage() {
  const router = useRouter();

  const langType = useSelector(
    (state: RootState) => state.languageTab.langType
  );

  const userId = useSelector((state: RootState) => state.user.userId);

  const [isPlayed, setIsPlayed] = useState<null | boolean>(null);

  const { data: contentList } = useCommunityDetailQuery(
    router.query.id as string
  );

  console.log("contentList", contentList);

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();

  const [audioPath, setAudioPath] = useState<string>("");

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

  const onPlay: YouTubeProps["onPlay"] = (event) => {
    console.log("onPlay");
    console.log("event", event);
  };

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
    if (contentList) {
      setAudioPath(contentList[0].recordPath);
    }
  }, [contentList]);

  const onLeave = (origin: any, destination: any, direction: any) => {
    console.log("onLeave", { origin, destination, direction });
    console.log("destination index", destination.index);
    // console.log("recordPath", contentList[destination.index].recordPath);

    setAudioPath(contentList[destination.index].recordPath);
  };

  const credits: Credits = {
    enabled: false,
    label: "my custom",
    position: "left",
  };

  return (
    <>
      {contentList && (
        <ReactFullpage
          licenseKey={"OPEN-SOURCE-GPLV3-LICENSE"}
          navigation
          onLeave={onLeave}
          pluginWrapper={pluginWrapper}
          debug={false}
          credits={credits}
          render={(comp: any) => (
            <ReactFullpage.Wrapper>
              {contentList.map((content: any) => {
                return (
                  <div key={content.recordId} className="section">
                    <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
                      <>
                        <div className="flex mb-8 flex flex-row mt-16 mb-16 items-center w-390 px-16">
                          <Image
                            src={content.profileImage ?? profile_01}
                            alt="profileImage"
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <p className="ml-4 text-dubgraymedium">
                            {content.nickname}
                          </p>
                        </div>
                        <YouTube
                          videoId={transferYoutube(content.videoPath)}
                          opts={{
                            height: "221",
                            width: "390",
                            playerVars: {
                              start: content.startTime,
                              end: content.endTime,
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
                            youtubePlayer.seekTo(content.startTime);

                            if (audioRef.current) {
                              audioRef.current.pause();
                              audioRef.current.currentTime = 0;
                            }
                          }}
                        />
                        <audio
                          ref={audioRef}
                          style={{ display: "none" }}
                          src={audioPath}
                        />
                        <div className="mt-16">
                          <ShortsTitle
                            userId={content.userId}
                            title={content.title}
                            playCount={playCountUp?.playCount}
                            createdDate={content.createdDate}
                            recordCommentCount={content.recordCommentCount}
                            recordLikeCount={playCountUp?.likeCount}
                            isLike={playCountUp?.like}
                            isScrap={false}
                          />
                        </div>
                        <div className="h-250 pt-32 overflow-y-scroll bg-black container mx-auto mb-16 w-391 mt-15">
                          {content.scriptList &&
                            content.scriptList.map(
                              (item: any, index: number) => {
                                return (
                                  <div
                                    className={`script-element-${index} mb-8 mx-20 flex flex-col items-center`}
                                    key={index}
                                  >
                                    <p className="text-16 text-white">
                                      {item.content}
                                    </p>
                                    {langType === LangType.ENGLISH ? (
                                      <p className="text-14 text-[#8E8D8D]">
                                        {item.translateContent}
                                      </p>
                                    ) : null}
                                  </div>
                                );
                              }
                            )}
                        </div>
                      </>
                    </div>
                  </div>
                );
              })}
            </ReactFullpage.Wrapper>
          )}
        />
      )}
    </>
  );
}
