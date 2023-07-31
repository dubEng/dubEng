import Image from "next/image";
import RecordIcon from "../../../../public/icons/dubbing-icon/record.svg";
import RecordingIcon from "../../../../public/icons/dubbing-icon/recording.svg";

interface Iprops {
  isRecording: boolean;
  startRecording: () => void;
  disable: boolean;
}

export default function RecordButton({
  isRecording,
  startRecording,
  disable,
}: Iprops) {
  if (isRecording) {
    return (
      <button disabled={disable}>
        <Image
          src={RecordingIcon}
          alt={"RecordingButton"}
          width={44}
          height={44}
        />
                  <p className="text-12 text-dubgray mt-4">녹음하기</p>
      </button>
    )
  } else {
    return (
      <button onClick={startRecording} disabled={disable}>
        <Image src={RecordIcon} alt={"RecordButton"} width={44} height={44} />
        <p className="text-12 text-dubgray mt-4">녹음하기</p>
      </button>
    )
  }
}
