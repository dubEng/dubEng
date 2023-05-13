import useContentsDetailQuery from "@/apis/community/queries/useContentsDetailQuery";
import DubButton from "@/components/atoms/DubButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";

interface Iprops {
  id: number;
  title: string;
  thumbnail: string;
  runtime: number;
}

const MySwal = withReactContent(Swal);

export default function ShortsVideoPage() {
  const router = useRouter();

  const userId = useSelector((state: RootState) => state.user.userId);

  //추후에 languageType도 같이 받아오면 좋을 듯!
  const { data } = useContentsDetailQuery("english", router.query.id as string);

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();

  const [selectedScript, setSelectedScript] = useState<number>(0);

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
  };

  // 선택된 스크롤이 바뀌면 오토 스크롤
  // useEffect(() => {
  //   if (
  //     document.querySelector<HTMLElement>(`.script-element-${selectedScript}`)
  //   ) {
  //     const element = document.querySelector<HTMLElement>(
  //       `.script-element-${selectedScript}`
  //     );
  //     element?.scrollIntoView({ behavior: "smooth", block: "center" });
  //   }
  // }, [selectedScript]);

  // // // 1초마다 영상 실행 시간 가져오기
  // useEffect(() => {
  //   const watchTime = setInterval(() => {
  //     // 영상이 재생중일 때만 실행
  //     const time = Math.floor(Number(youtubePlayer?.getCurrentTime()));

  //     const progress =
  //       ((time - data.startTime) / (data.endTime - data.startTime)) * 100 + "%";

  //     //TODO: 21 -> endTime
  //     if (time == 0) {
  //       setSelectedScript(0);
  //     }

  //     /* 실시간 하이라이팅 */
  //     // flag가 false이거나 선택된 스크립트의 idx값이 전체 스크립트의 길이보다 작으면 실행
  //     if (selectedScript < data.scriptList.length && time > 0) {
  //       // 해당 스크립트 리스트의 startTime이 undefined가 아니라면
  //       if (data.scriptList[selectedScript]?.startTime != undefined) {
  //         // 현재 재생되고 있는 영상의 시간이 현재 스크립트의 시작 시간보다 크거나 같고
  //         // 현재 재생되고 있는 영상의 시간이 다음 스크립트의 시작 시간보다 작거나 같다면
  //         // selectedScript를 증가하지 않고 넘어간다.
  //         if (
  //           data.scriptList[selectedScript]?.startTime <= time &&
  //           time <= data.scriptList[selectedScript + 1]?.startTime
  //         ) {
  //           // console.log("현재 스크립트가 재생중인 영상과 일치합니다.");
  //         } else {
  //           // console.log("다음 스크립트로 넘어가자");
  //           setSelectedScript(selectedScript + 1);
  //         }
  //       }
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(watchTime);
  //   };
  // });

  function handleDubButton() {
    //로그인 하지 않은 사용자라면
    if (userId == "") {
      MySwal.fire({
        icon: "info",
        title: "로그인 후 이용 가능한 서비스입니다.",
      }).then(() => {
        router.push("/login");
      });
    } else {
      router.push(`/dubbing/${data.id}`);
    }
  }

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center mt-32">
      {data && (
        <>
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
            onEnd={(e) => {
              youtubePlayer.pauseVideo();
              youtubePlayer.seekTo(data.startTime);

              setSelectedScript(0);
            }}
          />
          <div className="flex flex-row justify-between mt-16 mb-16 items-center w-390">
            <p className="text-16 text-white">{data.title}</p>
              <div>
                <DubButton type={"shorts"} onClick={handleDubButton} />
              </div>
          </div>
          <div className="h-260 pt-32 overflow-y-scroll bg-black container mx-auto mb-16 w-391">
            {data.scriptList &&
              data.scriptList.map((item: any) => {
                return (
                  <div
                    className={`script-element-${item.id} mb-8 mx-20 flex flex-col items-center`}
                    key={item.id}
                  >
                    <p className="text-16 text-white">{item.content}</p>
                    <p className="text-14 text-[#8E8D8D]">
                      {item.translateContent}
                    </p>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
