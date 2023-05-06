import Image from "next/image";
import defaultRecordingIcon from "../../../public/icons/recording-icon/defaultRecordingIcon.svg";
import dubbingRecordingIcon from "../../../public/icons/recording-icon/dubbingRecordingIcon.svg";
import shortsRecordingIcon from "../../../public/icons/recording-icon/shortsRecordingIcon.svg";

interface Iprops {
  page: string;
}

export default function RecordingButton({ page }: Iprops) {
  if (page === "/dubbing") {
    return <Image src={dubbingRecordingIcon} alt="dubbingRecordingIcon" />;
  } else if (page === "/community/shorts") {
    return <Image src={shortsRecordingIcon} alt="shortsRecordingIcon" />;
  } else {
    return <Image src={defaultRecordingIcon} alt="defaultRecordingIcon" />;
  }
}
