import Image from "next/image";
import defaultRecordingIcon from "../../../public/icons/recording-icon/defaultRecordingIcon.svg";
import dubbingRecordingIcon from "../../../public/icons/recording-icon/dubbingRecordingIcon.svg";
import shortsRecordingIcon from "../../../public/icons/recording-icon/shortsRecordingIcon.svg";
import Sheet from "react-modal-sheet";
import { useState } from "react";
import DubVideoSlider from "../organism/DubVideoSlider";

interface Iprops {
  page: string;
}

export default function RecordingButton({ page }: Iprops) {
  const [isOpen, setOpen] = useState(false);

  if (page === "/dubbing") {
    return <Image src={dubbingRecordingIcon} alt="dubbingRecordingIcon" />;
  } else if (page === "/community/shorts") {
    return <Image src={shortsRecordingIcon} alt="shortsRecordingIcon" />;
  } else {
    return (
      <>
        <Image
          src={defaultRecordingIcon}
          alt="defaultRecordingIcon"
          onClick={() => setOpen(true)}
        />
        <DubVideoSlider isOpen={isOpen} setOpen={setOpen} />
      </>
    );
  }
}
