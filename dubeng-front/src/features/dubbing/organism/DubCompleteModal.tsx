import CommonButton from "@/components/atoms/CommonButton";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

import { MdClose } from "react-icons/md";
import PlayBarPreview from "../atoms/PlayBarPreview";
import PlayButtonSmall from "../atoms/PlayButtonSmall";
import useRecordSave from "@/apis/dubbing/mutations/useRecordSave";
import { RecordSave } from "@/types/RecordSave";
import useMissionCompleteQuery from "@/apis/mission/queries/useMissionCompleteQuery";
import DubMissionCompleteModal from "./DubMissionCompleteModal";
import { useDispatch } from "react-redux";
import { setOpen } from "../../../stores/mission/missionModalSlice";

const customStyles = {
  overlay: {
    zIndex: 900, // 모달의 오버레이(배경)에 대한 z-index 설정
  },
  content: {
    zIndex: 900,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "375px",
    height: "390px",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

interface Iprops {
  closeModal: () => void;
  modalIsOpen: boolean;
  videoPath: string;
  startTime: number;
  endTime: number;
  audioUrl: string;
  videoId: number;
  userId: string;
  totalRecordCount: number;
  totalRecordTime: number;
  runtime: number;
}

interface RadioOption {
  label: string;
  value: string;
}

const options: RadioOption[] = [
  { label: "공개", value: "public" },
  { label: "비공개", value: "private" },
];

export default function DubCompleteModal({
  closeModal,
  modalIsOpen,
  startTime,
  endTime,
  videoPath,
  audioUrl,
  videoId,
  userId,
  totalRecordCount,
  totalRecordTime,
  runtime,
}: Iprops) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // 공개 여부는 나중에 추가하기
  // const [selectedOption, setSelectedOption] = useState<string>("public");

  const [progressBar, setProgressBar] = useState<string>("0%");
  const [nowPlaying, setNowPlaying] = useState<boolean>(false);

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();
  const audioRef = useRef<HTMLAudioElement>(null);

  const mutation = useRecordSave();

  const { data, refetch } = useMissionCompleteQuery(videoId);

  const dispatch = useDispatch();

  // 1초마다 영상 실행 시간 가져오기
  useEffect(() => {
    const watchTime = setInterval(() => {
      // 영상이 재생중일 때만 실행
      if (nowPlaying) {
        const time = Math.floor(Number(youtubePlayer?.getCurrentTime()));

        const progress =
          ((time - startTime) / (endTime - startTime)) * 100 + "%";

        setProgressBar(progress);
      }
    }, 1000);

    return () => {
      clearInterval(watchTime);
    };
  });

  // const handleOptionChange = (value: string) => {
  //   setSelectedOption(value);
  // };

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

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (event.data === 1) {
      // 재생 중일 때
      setNowPlaying(true);
    } else if (event.data === 2 || event.data === 0) {
      //영상이 종료되거나, 일시 정지 시
      setNowPlaying(false);
    }
  };

  function handlePlayButton() {
    setIsPlaying(true);

    youtubePlayer.playVideo();
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  function handleStopButton() {
    setIsPlaying(false);
    youtubePlayer.pauseVideo();
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }

  async function handleComplete() {
    const payload: RecordSave = {
      url: audioUrl,
      videoId: videoId,
      userId: userId,
      runtime,
      totalRecordCount,
      totalRecordTime,
    };
    try {
      const response = await mutation.mutateAsync(payload);
      // console.log("response", response);
      const missionResponse = await refetch();
      // console.log("statusCode", missionResponse.data.code);

      //미션 성공
      if (missionResponse.data.code == 200) {
        dispatch(setOpen(missionResponse.data.mission.title));
      }
    } catch (e) {
      console.error("error", e);
    }

    closeModal();
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="미리보기 Modal"
      >
        <div className="container mx-auto">
          <div className="flex flex-row justify-between mb-8 items-center">
            <p className="text-16 font-semibold">미리 보기</p>
            <button onClick={closeModal}>
              <MdClose className="my-8 mr-8" size={24} />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="relative">
              <YouTube
                videoId={transferYoutube(videoPath)}
                opts={{
                  height: "196",
                  width: "350",
                  playerVars: {
                    start: startTime,
                    end: endTime,
                    autoplay: 0,
                    modestbranding: 0, // 컨트롤 바에 youtube 로고를 표시하지 않음
                    controls: 0,
                  },
                }}
                onReady={onPlayerReady}
                onEnd={(e) => {
                  setIsPlaying(false);

                  youtubePlayer.pauseVideo();
                  youtubePlayer.seekTo(startTime);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }}
                onStateChange={onStateChange}
              />
              <div className="opacity-100 absolute top-0 left-0 w-320 h-174"></div>
            </div>
            <div className="w-290 h-30 border-1 border-dubgraymedium my-8 rounded-lg flex flex-row justify-between items-center px-8 mb-16">
              <PlayBarPreview width={progressBar} />
              <PlayButtonSmall
                isPlaying={isPlaying}
                playVideo={handlePlayButton}
                stopVideo={handleStopButton}
                disable={false}
              />
            </div>
            {/* <div className="flex flex-col items-center text-16 mt-8 text-dubblack">
              <p className="mb-8 font-semibold">공개여부</p>
              <div className="flex flex-row justify-center mb-16">
              {options.map((option) => (
                <div className="mx-4" key={option.value}>
                <label key={option.value} className="mr-4">
                {option.label}
                </label>
                <input
                type="radio"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={() => handleOptionChange(option.value)}
                />
                </div>
                ))}
                </div>
              </div> */}
            <CommonButton children={"완료하기"} onClick={handleComplete} />
            <audio ref={audioRef} style={{ display: "none" }} src={audioUrl} />
          </div>
        </div>
      </Modal>
    </>
  );
}
