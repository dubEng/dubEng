import Image from "next/image";
import SoundIcon from "../../../../public/icons/dubbing-icon/sound.svg";
import SoundPlayIcon from "../../../../public/icons/dubbing-icon/sound-play.svg";
import SoundDisableIcon from "../../../../public/icons/dubbing-icon/sound-disable.svg";
import { SoundType } from "../../../enum/statusType";

interface Iprops {
  soundStatus: string;
  onClick: () => void;
}

export default function ListenButton({ soundStatus, onClick }: Iprops) {
  if (soundStatus == SoundType.DEFAULT) {
    return (
      <Image
        src={SoundIcon}
        alt={"defaultButton"}
        width={44}
        height={44}
        onClick={onClick}
      />
    );
  } else if (soundStatus == SoundType.PLAYING) {
    return (
      <Image
        src={SoundPlayIcon}
        alt={"playButton"}
        width={44}
        height={44}
        onClick={onClick}
      />
    );
  } else {
    return (
      <Image
        src={SoundDisableIcon}
        alt={"disableButton"}
        width={44}
        height={44}
        onClick={onClick}
      />
    );
  }
}
