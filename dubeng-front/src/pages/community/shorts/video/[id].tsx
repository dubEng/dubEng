import useContentsDetailQuery from "@/apis/community/queries/useContentsDetailQuery";
import DubButton from "@/components/atoms/DubButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";
import { LangType } from "@/enum/statusType";

import useScrapPost from "@/apis/community/mutations/useScrapPost";

// react-icons/md/MdOutlineTurnedInNot
// react-icons/md/MdOutlineTurnedIn
import { MdOutlineTurnedInNot } from "react-icons/md";
import { MdOutlineTurnedIn } from "react-icons/md";
import useScrapQuery from "@/apis/community/queries/useScrapQuery";

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

  const langType = useSelector(
    (state: RootState) => state.languageTab.langType
  );


  //추후에 languageType도 같이 받아오면 좋을 듯!
  const { data } = useContentsDetailQuery(router.query.id as string);

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();

  const [selectedScript, setSelectedScript] = useState<number>(0);

  const { data: isScrapData } = useScrapQuery(data?.id, userId);

  const { mutate } = useScrapPost();

  function handleScrapButton() {
    // post해주기
    mutate({ userId: userId, videoId: data.id });
  }
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


          // 현재 재생되고 있는 영상의 시간이 현재 스크립트의 시작 시간보다 크거나 같고
          // 현재 재생되고 있는 영상의 시간이 다음 스크립트의 시작 시간보다 작거나 같다면
          // selectedScript를 증가하지 않고 넘어간다.
          if (currentTimeSecond <= time && time <= nextTimeSecond) {
            // console.log("현재 스크립트가 재생중인 영상과 일치합니다.");
          }
          // 현재 선택된 스크립트의 시간보다 진행중인 시간이 더 크다면
          else if (time > currentTimeSecond) {
            setSelectedScript(selectedScript + 1);
          }
        }
      }
    }, 500);

    return () => {
      clearInterval(watchTime);
    };
  });

  function handleDubButton() {
    //로그인 하지 않은 사용자라면
    if (userId.length == 0) {
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
    <div className="w-full h-screen bg-black flex flex-col items-center justify-start">
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
          <div className="flex flex-row justify-between mt-16 mb-16 items-center w-390 px-16">
            <div className="flex max-w-200 space-x-4">
              <p className="text-16 text-white line-clamp-1">{data.title}</p>
              {userId &&
                (isScrapData ? (
                  <button
                    className="text-dubgraylight"
                    onClick={handleScrapButton}
                  >
                    <MdOutlineTurnedIn size={20} />
                  </button>
                ) : (
                  <button
                    className="text-dubgraylight"
                    onClick={handleScrapButton}
                  >
                    <MdOutlineTurnedInNot size={20} />
                  </button>
                ))}
            </div>
            <div>
              <DubButton type={"shorts"} onClick={handleDubButton} />
            </div>
          </div>
          <div className="h-200 pt-32 overflow-y-scroll scrollbar-hide bg-black container mx-auto mb-16 w-391 mt-15">
            {data.scriptList &&
              data.scriptList.map((item: any, index: number) => {
                if (index === selectedScript) {
                  return (
                    <div
                      className={`script-element-${index} mb-8 mx-20 flex flex-col items-center bg-dubblue`}
                      key={index}
                    >
                      <p className="text-16 text-white">{item.content}</p>
                      {langType === LangType.ENGLISH ? (
                        <p className="text-14 text-[#8E8D8D]">
                          {item.translateContent}
                        </p>
                      ) : null}
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={`script-element-${index} mb-8 mx-20 flex flex-col items-center`}
                      key={index}
                    >
                      <p className="text-16 text-white">{item.content}</p>
                      {langType === LangType.ENGLISH ? (
                        <p className="text-14 text-[#8E8D8D]">
                          {item.translateContent}
                        </p>
                      ) : null}
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
