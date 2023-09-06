import Image from "next/image";
import defaultRecordingIcon from "../../../public/icons/recording-icon/defaultRecordingIcon.svg";
import dubbingRecordingIcon from "../../../public/icons/recording-icon/dubbingRecordingIcon.svg";
import shortsRecordingIcon from "../../../public/icons/recording-icon/shortsRecordingIcon.svg";
import { useState } from "react";

interface Iprops {
  page: string;
}

export default function RecordingButton({ page }: Iprops) {
  if (page.includes("shorts")) {
    return <Image src={shortsRecordingIcon} alt="shortsRecordingIcon" />;
  } else {
    return <Image src={defaultRecordingIcon} alt="defaultRecordingIcon" />;
  }
}
