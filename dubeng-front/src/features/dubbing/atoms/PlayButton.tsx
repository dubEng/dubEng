import Image from "next/image";
import PlayIcon from "../../../../public/icons/dubbing-icon/play.svg";
import StopIcon from "../../../../public/icons/dubbing-icon/stop.svg";

interface Iprops {
  isPlaying: boolean;
  playVideo: () => void;
  stopVideo: () => void;
  disable: boolean;
}

export default function PlayButton({
  isPlaying,
  playVideo,
  stopVideo,
  disable,
}: Iprops) {
  if (isPlaying) {
    return (
      <button onClick={stopVideo} disabled={disable}>
        <Image src={StopIcon} alt={"stopButton"} width={44} height={44} />
        <p className="text-12 text-dubgray mt-4">원본듣기</p>
      </button>
    );
  } else {
    return (
      <button onClick={playVideo} disabled={disable}>
        <Image src={PlayIcon} alt={"playButton"} width={44} height={44} />
        <p className="text-12 text-dubgray mt-4">원본듣기</p>
      </button>
    );
  }
}
