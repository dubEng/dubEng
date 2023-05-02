import Image from "next/image";
import RecordIcon from "../../../../public/icons/dubbing-icon/record.svg";
import RecordingIcon from "../../../../public/icons/dubbing-icon/recording.svg";

interface Iprops {
  isRecording: boolean;
}


export default function RecordButton({isRecording}:Iprops ) {
  if (isRecording) {
    return <Image src={RecordingIcon} alt={"RecordingButton"} width={44} height={44} />;
  } else {
    return <Image src={RecordIcon} alt={"RecordButton"} width={44} height={44} />;
  }
}
