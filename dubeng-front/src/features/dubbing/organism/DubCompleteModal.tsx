import CommonButton from "@/components/atoms/CommonButton";
import { useRef, useState } from "react";
import Modal from "react-modal";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

import { MdClose } from "react-icons/md";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
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
  audioUrl
}: Iprops) {
  const [selectedOption, setSelectedOption] = useState<string>("public");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const audioRef = useRef<HTMLAudioElement>(null);

  function transferYoutube(videoPath: string) {
    const originalUrl = videoPath;
    const splitUrl = originalUrl.split("watch?v=");
    const transferVideoPath = splitUrl[1];
    return transferVideoPath;
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="미리보기 Modal"
      >
        <div className="flex flex-row justify-end">
          <MdClose className="my-8 mr-8" size={16} />
        </div>
        <div className="flex flex-row justify-center">
          <YouTube
            videoId={transferYoutube(videoPath)}
            opts={{
              height: "156",
              width: "273",
              playerVars: {
                start: startTime,
                end: endTime,
                autoplay: 0,
                modestbranding: 0, // 컨트롤 바에 youtube 로고를 표시하지 않음
                controls: 0,
              },
            }}
            // onReady={onPlayerReady}
            // onEnd={(e) => {
            //   console.log("onEnd");

            //   youtubePlayer.pauseVideo();
            //   youtubePlayer.seekTo(data.startTime);

            //   setSelectedScript(0);
            // }}
            // onPlay={onPlay}
            // onStateChange={onStateChange}
          />
          <audio
            ref={audioRef}
            style={{ display: "none" }}
            src={audioUrl}
            // onEnded={handleAudioEnded}
          />
          <div className="text-16 inline-block">
            <p>공개여부</p>
            <div className="flex flex-row justify-center">
              {options.map((option) => (
                <label key={option.value}>
                  <input
                    type="radio"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={() => handleOptionChange(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          <CommonButton children={"완료하기"} onClick={() => {}} />
        </div>
      </Modal>
    </>
  );
}
