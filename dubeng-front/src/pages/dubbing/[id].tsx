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
import ErrorComponent from "@/components/atoms/ErrorComponent";
import ScaleLoader from "react-spinners/ScaleLoader";
import DubCompleteModal from "@/features/dubbing/organism/DubCompleteModal";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DubLoadingModal from "@/features/dubbing/organism/DubLoadingModal";
import { LangType } from "@/enum/statusType";

const MySwal = withReactContent(Swal);

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

  const scriptList = useDubRecordScriptQuery(
    parseInt(router.query.id as string)
  );

  const mutation = useRecordPreviewPost();

  const userId = useSelector((state: RootState) => state.user.userId);
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();

  const [nowPlaying, setNowPlaying] = useState<boolean>(false);

  // const [selectedScript, setSelectedScript] = useState<number>(0);

  const [speechToText, setSpeechToText] = useState<string>("");

  const [timerId, setTimerId] = useState<number>(0);

  const [progressBarWidth, setProgressBarWidth] = useState<string>("0%");

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const [dubbingCheckList, setDubbingCheckList] = useState<number[]>([]);

  const [opendLoadingModal, setOpendLoadingModal] = useState<boolean>(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const errorHandler = (message: string) => {
    setOpendLoadingModal(false);
    MySwal.fire({
      icon: "error",
      title: "더빙 영상을 저장하는데 실패하였습니다.",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  };

  const updateDubbingCompleteCheckList = (newNumber: number) => {
    setDubbingCheckList((prevValues) => [...prevValues, newNumber]);
  };

  function transferYoutube(videoPath: string) {
    const originalUrl = videoPath;
    const splitUrl = originalUrl.split("watch?v=");
    const transferVideoPath = splitUrl[1];
    return transferVideoPath;
  }

  async function handleSaveButton() {
    findNoDubbingScripts();
  }

  async function saveDubbingFile() {
    if (router.query.id) {
      const payload: RecordPreview = {
        nickname: nickname,
        userId: userId,
        videoId: parseInt(router.query.id as string),
        accessToken,
      };

      try {
        setOpendLoadingModal(true);
        const response = await mutation.mutateAsync(payload);
        setPreviewUrl(response);
        setOpendLoadingModal(false);
        openModal();
      } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        errorHandler(message);
      }
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

  // 1초마다 영상 실행 시간 가져오기
  useEffect(() => {
    const watchTime = setInterval(() => {
      // 영상이 재생중일 때만 실행
      if (nowPlaying) {
        const time = Math.floor(Number(youtubePlayer?.getCurrentTime()));

        const progress =
          ((time - data.startTime) / (data.endTime - data.startTime)) * 100 +
          "%";

        setProgressBarWidth(progress);
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
    if (event.data === 1) {
      // 재생 중일 때
      setNowPlaying(true);
    } else if (event.data === 2 || event.data === 0) {
      //영상이 종료되거나, 일시 정지 시
      setNowPlaying(false);
    }
  };

  const handleSlideChange = (swiper: any) => {
    setSpeechToText("");
    window.clearTimeout(timerId);

    const activeIndex = swiper.activeIndex;
    const seekTo = scriptList.data[activeIndex].startTime;

    const progress =
      ((seekTo / 1000 - data.startTime) / (data.endTime - data.startTime)) *
        100 +
      "%";

    setProgressBarWidth(progress);

    youtubePlayer.pauseVideo();
    youtubePlayer.seekTo(seekTo / 1000);
  };

  function findNoDubbingScripts() {
    const recordingNumberList = [...new Set(dubbingCheckList)];

    const scriptNumberList = Array.from(
      { length: scriptList.data.length },
      (_, index) => index + 1
    );

    const noDubbingScriptList = scriptNumberList.filter(
      (value) => !recordingNumberList.includes(value)
    );

    if (
      noDubbingScriptList.length === 0 &&
      scriptNumberList.length === recordingNumberList.length
    ) {
      saveDubbingFile();
    } else {
      const lastIndex = noDubbingScriptList.length - 1;

      let resultString = noDubbingScriptList
        .map((value, index) => {
          if (index !== lastIndex) {
            return value.toString() + ", ";
          }
          return value.toString();
        })
        .join("");

      resultString += "번 스크립트가 아직 더빙되지 않았습니다.";

      MySwal.fire({
        text: resultString,
        icon: "info",
      });
    }
  }

  if (speechRecognitionSupported === null) {
    return null; // return null on first render, can be a loading indicator
  }

  if (!speechRecognitionSupported) {
    return <span>스피치 인식을 지원하지 않는 브라우저 입니다.</span>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-16">
        <ScaleLoader color="#FF6D60" />
      </div>
    );
  }

  if (isError) {
    return <ErrorComponent onClick={() => {}} retry={false} />;
  }

  return (
    <div className="h-full mb-61">
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

            // setSelectedScript(0);
          }}
          onPlay={onPlay}
          onStateChange={onStateChange}
        />
      )}
      <PlayBar width={progressBarWidth} />
      <div className="w-390 my-8 py-8 bg-dubgraylight flex justify-center items-center">
        <Swiper
          spaceBetween={4}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => console.log(swiper)}
          centeredSlides
        >
          {scriptList.data &&
            scriptList.data.map((item: any, index: number) => (
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
                  scriptLength={scriptList.data.length}
                  youtubePlayer={youtubePlayer}
                  speechToText={speechToText}
                  langType={data.langType}
                  setSpeechToText={setSpeechToText}
                  timerId={timerId}
                  setTimerId={setTimerId}
                  updateDubbingCompleteCheckList={
                    updateDubbingCompleteCheckList
                  }
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="h-156 overflow-y-scroll bg-white mb-16 w-391">
        <p className="flex justify-start mx-16 text-16 font-bold mt-16 mb-8">
          전체 스크립트
        </p>

        {scriptList.data &&
          scriptList.data.map((item: any) => {
            return (
              <div
                className={`script-element-${item.id} mb-8 mx-20`}
                key={item.id}
              >
                <p className="text-14 text-dubblack">{item.content}</p>
                {data.langType === LangType.ENGLISH ? (
                  <p className="text-14 text-dubgray">
                    {item.translateContent}
                  </p>
                ) : null}
              </div>
            );
            // if (item.id === selectedScript) {
            //   return (
            //     <div
            //       className={`script-element-${item.id} mb-8 mx-20 bg-dubblue`}
            //       key={item.id}
            //     >
            //       <p className="text-14 text-dubblack">{item.content}</p>
            //       <p className="text-14 text-dubgray">
            //         {item.translateContent}
            //       </p>
            //     </div>
            //   );
            // } else {
            //   return (
            //     <div
            //       className={`script-element-${item.id} mb-8 mx-20`}
            //       key={item.id}
            //     >
            //       <p className="text-14 text-dubblack">{item.content}</p>
            //       <p className="text-14 text-dubgray">
            //         {item.translateContent}
            //       </p>
            //     </div>
            //   );
            // }
          })}
      </div>
      <div className="flex justify-center w-390">
        <CommonButton children="저장하기" onClick={handleSaveButton} />
      </div>
      {opendLoadingModal && <DubLoadingModal />}
      <DubCompleteModal
        closeModal={closeModal}
        startTime={data.startTime}
        endTime={data.endTime}
        videoPath={data.videoPath}
        modalIsOpen={modalIsOpen}
        audioUrl={previewUrl}
        videoId={parseInt(router.query.id as string)}
        userId={userId}
        runtime={data.runtime}
        totalRecordCount={data.totalRecordCount}
        totalRecordTime={data.totalRecordTime}
      />
      <div className="h-80"></div>
    </div>
  );
}
