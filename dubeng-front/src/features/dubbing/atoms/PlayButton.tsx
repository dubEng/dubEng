import Image from "next/image";
import PlayIcon from "../../../../public/icons/dubbing-icon/play.svg";
import StopIcon from "../../../../public/icons/dubbing-icon/stop.svg";

interface Iprops {
  isPlaying: boolean;
  onClick: () => void;
}

export default function PlayButton({ isPlaying, onClick }: Iprops) {
  if (isPlaying) {
    return <Image src={StopIcon} alt={"stopButton"} width={44} height={44} onClick={onClick} />;
  } else {
    return <Image src={PlayIcon} alt={"playButton"} width={44} height={44} onClick={onClick} />;
  }
}
