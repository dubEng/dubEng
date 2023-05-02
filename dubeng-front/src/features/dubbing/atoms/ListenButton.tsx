import Image from "next/image";
import SoundIcon from "../../../../public/icons/dubbing-icon/sound.svg";
import SoundPlayIcon from "../../../../public/icons/dubbing-icon/sound-play.svg";
import SoundDisableIcon from "../../../../public/icons/dubbing-icon/sound-disable.svg";
import { SoundType } from "../../../enum/statusType";

interface Iprops {
  soundStatus: string;
}

export default function ListenButton({ soundStatus }: Iprops) {
  if (soundStatus == SoundType.DEFAULT) {
    return (
      <Image src={SoundIcon} alt={"defaultButton"} width={44} height={44} />
    );
  } else if (soundStatus == SoundType.PLAYING) {
    return (
      <Image src={SoundPlayIcon} alt={"playButton"} width={44} height={44} />
    );
  } else {
    return (
      <Image
        src={SoundDisableIcon}
        alt={"disableButton"}
        width={44}
        height={44}
      />
    );
  }
}
