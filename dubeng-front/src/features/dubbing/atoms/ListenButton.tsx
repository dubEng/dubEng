import Image from "next/image";
import SoundIcon from "../../../../public/icons/dubbing-icon/sound.svg";
import SoundPlayIcon from "../../../../public/icons/dubbing-icon/sound-play.svg";
import SoundDisableIcon from "../../../../public/icons/dubbing-icon/sound-disable.svg";
import { SoundType } from "../../../enum/statusType";

interface Iprops {
  soundStatus: string;
  startListening: () => void;
  disable: boolean;
}

export default function ListenButton({
  soundStatus,
  startListening,
  disable,
}: Iprops) {
  if (soundStatus == SoundType.DEFAULT) {
    return (
      <button onClick={startListening} disabled={disable}>
        <Image src={SoundIcon} alt={"defaultButton"} width={44} height={44} />
      </button>
    );
  } else if (soundStatus == SoundType.PLAYING) {
    return (
      <button disabled={disable}>
        <Image src={SoundPlayIcon} alt={"playButton"} width={44} height={44} />
      </button>
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
