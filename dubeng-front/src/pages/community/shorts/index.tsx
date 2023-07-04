import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

import Image from "next/image";
import ShortsTitle from "@/features/community/molecules/ShortsTitle";
import DefaultImage from "../../../../public/images/default/mic_profile.png";
import usePlayCountUpQuery from "@/apis/community/queries/usePlayCountUpQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

import ReactFullpage from "@fullpage/react-fullpage";
import useCommunityShortsQuery from "@/apis/community/queries/useCommunityShortsQuery";
import Link from "next/link";
import Head from "next/head";

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

  const userId = useSelector((state: RootState) => state.user.userId);

  const [isPlayed, setIsPlayed] = useState<null | boolean>(null);

  const { data: contentList, refetch } = useCommunityShortsQuery();

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

  // const { data: playCountUp, refetch } = usePlayCountUpQuery(
  //   userId,
  //   Number(router.query.id)
  // );

  const onPlay: YouTubeProps["onPlay"] = (event) => {
    // console.log("onPlay");
    // console.log("event", event);
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    // console.log("onStateChange");

    if (event.data === 1) {
      if (audioRef.current) {
        audioRef.current.play();
      }
      setIsPlayed(true);
      // 재생 중일 때
    } else if (event.data === 2) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      //일시 정지 시
    }
  };
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (contentList) {
      setAudioPath(contentList[0].recordPath);
    }
  }, [contentList]);

  const onLeave = (origin: any, destination: any, direction: any) => {
    // console.log("onLeave", { origin, destination, direction });
    // console.log("destination index", destination.index);
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
      <Head>
        <title>더빙으로 배우는 영어 쉐도잉 서비스 - Shorts</title>
        <meta
          name="description"
          content="더빙으로 배우는 영어 쉐도잉 서비스, Shorts를 통해 모바일에서도 빠르고 편리하게 더빙된 영상을 확인할 수 있습니다."
        />
      </Head>
      {contentList && (
        <ReactFullpage
          licenseKey={"OPEN-SOURCE-GPLV3-LICENSE"}
          navigation={false}
          onLeave={onLeave}
          pluginWrapper={pluginWrapper}
          debug={false}
          scrollOverflow={false}
          credits={credits}
          render={(comp: any) => (
            <ReactFullpage.Wrapper>
              {contentList.map((content: any, index: number) => {
                return (
                  <div key={content.recordId} className="section">
                    <div className="w-full h-screen bg-black flex flex-col items-center justify-start">
                      <>
                        <Link href={`/mypage/${content.userId}`}>
                          <div className="flex flex-row mt-16 mb-16 items-center w-390 px-16">
                            <Image
                              src={content.profileImage ?? DefaultImage}
                              alt="profileImage"
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            <p className="ml-4 text-dubgraymedium">
                              {content.nickname}
                            </p>
                          </div>
                        </Link>
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
                            createdDate={content.createdDate}
                            recordCommentCount={content.recordCommentCount}
                            isScrap={false}
                          />
                        </div>
                        <div className="relative">
                          <div className="h-200 pt-32 overflow-y-scroll scrollbar-hide bg-black container mx-auto mb-16 w-391 mt-15">
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
                                      <p className="text-14 text-[#8E8D8D]">
                                        {item.translateContent}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                          </div>
                          <div className="opacity-100 absolute top-0 left-0 w-391 h-200"></div>
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
