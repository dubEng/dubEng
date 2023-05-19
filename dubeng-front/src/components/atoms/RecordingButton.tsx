import Image from "next/image";
import defaultRecordingIcon from "../../../public/icons/recording-icon/defaultRecordingIcon.svg";
import dubbingRecordingIcon from "../../../public/icons/recording-icon/dubbingRecordingIcon.svg";
import shortsRecordingIcon from "../../../public/icons/recording-icon/shortsRecordingIcon.svg";
<<<<<<< HEAD
=======
import { useState } from "react";
>>>>>>> develop-front

interface Iprops {
  page: string;
}

export default function RecordingButton({ page }: Iprops) {
<<<<<<< HEAD
  if (page === "/dubbing") {
    return <Image src={dubbingRecordingIcon} alt="dubbingRecordingIcon" />;
  } else if (page === "/community/shorts") {
    return <Image src={shortsRecordingIcon} alt="shortsRecordingIcon" />;
  } else {
    return <Image src={defaultRecordingIcon} alt="defaultRecordingIcon" />;
=======
  if (page === "/community/shorts") {
    return <Image src={shortsRecordingIcon} alt="shortsRecordingIcon" />;
  } else {
    return (
      <Image
        src={defaultRecordingIcon}
        alt="defaultRecordingIcon"
      />
    );
>>>>>>> develop-front
  }
}
