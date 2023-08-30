import useCommunityShortsQuery from "@/apis/community/queries/useCommunityShortsQuery";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { FullPage, Slide } from "react-full-page";
import Image from "next/image";
import Head from "next/head";

import DefaultImage from "../../../../public/images/default/mic_profile.png";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import ShortsTitle from "@/features/community/molecules/ShortsTitle";

export default function ShortsPage() {
  const { data: contentList, refetch } = useCommunityShortsQuery();

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();

  // const [youtubePlayerList, setYoutubePlayerList] = useState<YouTubePlayer[]>(
  //   []
  // );

  const [audioPath, setAudioPath] = useState<string>("");

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlayed, setIsPlayed] = useState<null | boolean>(null);

  const [currentPage, setCurrentPage] = useState<number>(0);

  console.log("data", contentList);

  // 첫 렌더링에만 쇼츠콘텐츠 get 해오기
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (contentList) {
      setAudioPath(contentList[0].recordPath);
    }
    // for (let i=0;i<contentList.length;i++) {
    //   setYoutubePlayerList(...youtubePlayerList, youtubePlayer)
    // }
  }, [contentList]);

  // 유튜브 고유key값으로 가져오는 함수
  function processVideoPath(videoPath: string) {
    const originalUrl = videoPath;
    const splitUrl = originalUrl.split("watch?v=");
    const processedVideoPath = splitUrl[1];
    return processedVideoPath;
  }

  // 음원 재생 관련
  // player 준비시 실행
  // const onPlayerReady: YouTubeProps["onReady"] = (event) => {
  //   console.log("onPlayerReady 안");
  //   console.log("🔷", event.target.videoTitle);
  //   const player = event.target;
  //   setYoutubePlayer(player);
  //   player.pauseVideo();
  //   player.mute();
  // };

  const onPlay: YouTubeProps["onPlay"] = (event) => {
    setYoutubePlayer(event.target);
    // event.target.seekTo(contentList[currentPage].startTime);
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
      setIsPlayed(true);
    } else if (event.data === 2) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  const afterChange = (event: any) => {
    setAudioPath(contentList[event.to].recordPath);
    // console.log("플레이어", youtubePlayer);
    setCurrentPage(event.to);
  };

  const beforeChange = (event: any) => {
    if (youtubePlayer) {
      console.log(
        "bC발생하고 인덱스",
        "지금 재생될 startTime",
        contentList[event.from].startTime
      );
      youtubePlayer.pauseVideo();
      youtubePlayer.seekTo(contentList[event.from].startTime);
      console.log("어디서 왔느냐", youtubePlayer.videoTitle);
    }
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
        <FullPage
          // controls
          controlProps
          scrollMode={"full-page"}
          afterChange={afterChange}
          beforeChange={beforeChange}
        >
          {contentList.map((content: any, index: number) => {
            return (
              <Slide key={content.recordId}>
                <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
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
                      videoId={processVideoPath(content.videoPath)}
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
                      // onReady={onPlayerReady}
                      onPlay={onPlay}
                      onStateChange={onStateChange}
                      onEnd={(e) => {
                        // youtubePlayer.pauseVideo();
                        // youtubePlayer.seekTo(content.startTime);
                        // if (audioRef.current) {
                        //   audioRef.current.pause();
                        //   audioRef.current.currentTime = 0;
                        // }
                      }}
                    />
                    <audio
                      controls={true}
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
                  </>
                </div>
              </Slide>
            );
          })}
        </FullPage>
      )}
    </>
  );
}

// ex2
// import React, { useState } from "react";
// import { FullPage, Slide } from "react-full-page";

// const controlsProps = {
//   style: {
//     left: "50%",
//     paddingTop: "10px",
//     position: "fixed",
//     transform: "translateX(-50%)",
//   },
// };

// const slides = [
//   {
//     color: "#2ECC40",
//     content: 1,
//   },
//   {
//     color: "#0074D9",
//     content: 2,
//   },
//   {
//     color: "#00c4ff",
//     content: 3,
//   },
//   {
//     color: "#d52685",
//     content: 4,
//   },
// ];

// const btnStyles = {
//   position: "fixed",
//   padding: "8px",
// };

// export default function FullPageExample() {
//   const [visibleSlides, setVisibleSlides] = useState(slides);
//   const onHideSlideClick = () => {
//     if (visibleSlides.length === slides.length) {
//       setVisibleSlides(slides.slice(0, -1));
//       return;
//     }
//     setVisibleSlides(slides);
//   };

//   return (
//     <>
//       <button onClick={onHideSlideClick} type="button" style={btnStyles}>
//         toggle last slide
//       </button>
//       <FullPage controlsProps={controlsProps} scrollMode>
//         {visibleSlides.map(({ color, content }) => (
//           <Slide
//             key={content}
//             style={{
//               background: color,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <h1>{content}</h1>
//           </Slide>
//         ))}
//       </FullPage>
//     </>
//   );
// }

// EX 3
// import { FullPage, Slide } from "react-full-page";
// import React from "react";
// import ReactDOM from "react-dom";

// class TestApp extends React.Component {
//   render() {
//     return (
//       <div>
//         <FullPage controls controlsProps={{ className: "slide-navigation" }}>
//           <Slide>
//             <div className="section-common section-area1">1</div>
//           </Slide>
//           <Slide>
//             <div className="section-common section-area2">2</div>
//           </Slide>
//           <Slide>
//             <div className="section-common section-area3">3</div>
//           </Slide>
//         </FullPage>
//       </div>
//     );
//   }
// }

// ReactDOM.render(<TestApp />, document.getElementById("root"));
