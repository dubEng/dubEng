import Image from "next/image";
import RecordIcon from "../../../../public/icons/dubbing-icon/record.svg";
import RecordingIcon from "../../../../public/icons/dubbing-icon/recording.svg";

interface Iprops {
  isRecording: boolean;
  onClick: () => void;
}


export default function RecordButton({isRecording, onClick}:Iprops ) {
  if (isRecording) {
    return <Image src={RecordingIcon} alt={"RecordingButton"} width={44} height={44} onClick={onClick} />;
  } else {
    return <Image src={RecordIcon} alt={"RecordButton"} width={44} height={44} onClick={onClick} />;
  }
}
