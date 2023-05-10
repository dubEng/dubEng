import { useState, useEffect } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import { useSpeechRecognition } from "react-speech-recognition";
import DubBox from "@/features/dubbing/organism/DubBox";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PlayBar from "@/features/dubbing/atoms/PlayBar";
import CommonButton from "@/components/atoms/CommonButton";
import useDubRecordVideoInfoQuery from "@/apis/dubbing/queries/useDubRecordVideoInfoQuery";
import useDubRecordScriptQuery from "@/apis/dubbing/queries/useDubRecordScriptQuery";

import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useRouter } from "next/router";
import useRecordPreviewPost from "@/apis/dubbing/mutations/useRecordPreviewPost";
import { RecordPreview } from "@/types/RecordPreview";

interface Iprops {
  id: number;
  title: string;
  videoPath: string;
  startTime: number;
  endTime: number;
}

export default function DubbingPage() {
  const router = useRouter();

  const { isLoading, isError, data } = useDubRecordVideoInfoQuery(
    parseInt(router.query.id as string)
  );

  const scriptListTemp = useDubRecordScriptQuery(
    parseInt(router.query.id as string)
  );

  const mutation = useRecordPreviewPost();

  const userId = useSelector((state: RootState) => state.user.userId);
  const nickname = useSelector((state: RootState) => state.user.nickname);
  console.log('userId', userId);
  console.log('nickname', nickname);

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();

  const [nowPlaying, setNowPlaying] = useState<boolean>(false);

  const [selectedScript, setSelectedScript] = useState<number>(0);

  const [speechToText, setSpeechToText] = useState<string>("");

  const [timerId, setTimerId] = useState<number>(0);

  const [progressBarWidth, setProgressBarWidth] = useState<string>("0%");

  function transferYoutube(videoPath: string) {
    const originalUrl = videoPath;
    const splitUrl = originalUrl.split("watch?v=");
    const transferVideoPath = splitUrl[1];
    return transferVideoPath;
  }

  async function handleSaveButton() {
    if (router.query.id) {
      const payload: RecordPreview = {
        nickname: nickname,
        userId: userId,
        videoId: parseInt(router.query.id as string),
      };

      await mutation.mutateAsync(payload);
    }
  }

  // 브라우저 호환성 체크
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState<
    boolean | null
  >(null);

  const { browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    // sets to true or false after component has been mounted
    setSpeechRecognitionSupported(browserSupportsSpeechRecognition);
  }, [browserSupportsSpeechRecognition]);

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
      // 영상이 재생중일 때만 실행
      if (nowPlaying) {
        const time = Math.floor(Number(youtubePlayer?.getCurrentTime()));

        const progress =
          Math.floor(
            (youtubePlayer?.getCurrentTime() * 100) /
              youtubePlayer?.getDuration()
          ) + "%";

        console.log("time");

        console.log("progress", progress);

        setProgressBarWidth(progress);

        //TODO: 21 -> endTime
        if (time == 0) {
          setSelectedScript(0);
        }

        if (time > data.endTime) {
          youtubePlayer.stopVideo();
          setSelectedScript(0);
        }

        /* 실시간 하이라이팅 */
        // flag가 false이거나 선택된 스크립트의 idx값이 전체 스크립트의 길이보다 작으면 실행
        if (selectedScript < scriptListTemp.data.length && time > 0) {
          // 해당 스크립트 리스트의 startTime이 undefined가 아니라면
          if (scriptListTemp.data[selectedScript]?.startTime != undefined) {
            // 현재 재생되고 있는 영상의 시간이 현재 스크립트의 시작 시간보다 크거나 같고
            // 현재 재생되고 있는 영상의 시간이 다음 스크립트의 시작 시간보다 작거나 같다면
            // selectedScript를 증가하지 않고 넘어간다.
            if (
              scriptListTemp.data[selectedScript]?.startTime <= time &&
              time <= scriptListTemp.data[selectedScript + 1]?.startTime
            ) {
              // console.log("현재 스크립트가 재생중인 영상과 일치합니다.");
            } else {
              // console.log("다음 스크립트로 넘어가자");
              setSelectedScript(selectedScript + 1);
            }
          }
        }
        // console.log("-------------------------------------------");
      }
    }, 1000);

    return () => {
      clearInterval(watchTime);
    };
  });

  // player 준비시 실행
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    const player = event.target;
    setYoutubePlayer(player);
    player.pauseVideo();
  };

  const onPlay: YouTubeProps["onPlay"] = (event) => {
    console.log("onPlay");
    console.log("event", event);
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    console.log("onStateChange");

    if (event.data === 1) {
      // 재생 중일 때
      console.log("영상 재생");
      setNowPlaying(true);
    } else if (event.data === 2 || event.data === 0) {
      //영상이 종료되거나, 일시 정지 시
      console.log("영상 정지");
      setNowPlaying(false);
    }
  };

  const handleSlideChange = (swiper: any) => {
    setSpeechToText("");
    window.clearTimeout(timerId);

    const activeIndex = swiper.activeIndex;
    const seekTo = scriptListTemp.data[activeIndex].startTime;
    youtubePlayer.pauseVideo();
    youtubePlayer.seekTo(seekTo);
  };

  if (speechRecognitionSupported === null) {
    return null; // return null on first render, can be a loading indicator
  }

  if (!speechRecognitionSupported) {
    console.log("스피치 인식을 지원하지 않는 브라우저 입니다.");
    return <span>스피치 인식을 지원하지 않는 브라우저 입니다.</span>;
  }

  return (
    <>
      {data && (
        <YouTube
          videoId={transferYoutube(data.videoPath)}
          opts={{
            height: "218",
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
            console.log("onEnd");

            youtubePlayer.pauseVideo();
            youtubePlayer.seekTo(data.startTime);

            setSelectedScript(0);
          }}
          onPlay={onPlay}
          onStateChange={onStateChange}
        />
      )}
      <PlayBar width={progressBarWidth} />
      <div className="w-391 h-390 bg-dubgraylight flex justify-center items-center">
        <Swiper
          spaceBetween={4}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => console.log(swiper)}
          centeredSlides
        >
          {scriptListTemp.data &&
            scriptListTemp.data.map((item: any, index: number) => (
              <SwiperSlide key={item.id}>
                <DubBox
                  videoId={router.query.id as string}
                  id={item.id}
                  content={item.content}
                  duration={item.duration}
                  startTime={item.startTime}
                  translateContent={item.translateContent}
                  pitchList={item.pitch}
                  scriptIndex={index + 1}
                  scriptLength={scriptListTemp.data.length}
                  youtubePlayer={youtubePlayer}
                  speechToText={speechToText}
                  setSpeechToText={setSpeechToText}
                  timerId={timerId}
                  setTimerId={setTimerId}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="h-156 overflow-y-scroll bg-white mb-16 w-391">
        <p className="flex justify-start mx-16 text-16 font-bold mt-16 mb-8">
          전체 스크립트
        </p>

        {scriptListTemp.data &&
          scriptListTemp.data.map((item: any) => {
            if (item.id === selectedScript) {
              return (
                <div
                  className={`script-element-${item.id} mb-8 mx-20 bg-dubblue`}
                  key={item.id}
                >
                  <p className="text-14 text-dubblack">{item.content}</p>
                  <p className="text-14 text-dubgray">
                    {item.translateContent}
                  </p>
                </div>
              );
            } else {
              return (
                <div
                  className={`script-element-${item.id} mb-8 mx-20`}
                  key={item.id}
                >
                  <p className="text-14 text-dubblack">{item.content}</p>
                  <p className="text-14 text-dubgray">
                    {item.translateContent}
                  </p>
                </div>
              );
            }
          })}
      </div>
      <div className="flex justify-center w-391 mb-16">
        <CommonButton children="저장하기" isDisabled onClick={handleSaveButton} />
      </div>
    </>
  );
}
