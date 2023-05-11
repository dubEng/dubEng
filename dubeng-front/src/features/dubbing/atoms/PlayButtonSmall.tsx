import Image from "next/image";
import PlayIcon from "../../../../public/icons/dubbing-icon/play.svg";
import StopIcon from "../../../../public/icons/dubbing-icon/stop.svg";

interface Iprops {
  isPlaying: boolean;
  playVideo: () => void;
  stopVideo: () => void;
  disable: boolean;
}

export default function PlayButtonSmall({
  isPlaying,
  playVideo,
  stopVideo,
  disable,
}: Iprops) {
  if (isPlaying) {
    return (
      <button onClick={stopVideo} disabled={disable}>
        <Image src={StopIcon} alt={"stopButton"} width={22} height={22} />
      </button>
    );
  } else {
    return (
      <button onClick={playVideo} disabled={disable}>
        <Image src={PlayIcon} alt={"playButton"} width={22} height={22} />
      </button>
    );
  }
}
