import Image from "next/image";
import defaultRecordingIcon from "../../../public/icons/recording-icon/defaultRecordingIcon.svg";
import dubbingRecordingIcon from "../../../public/icons/recording-icon/dubbingRecordingIcon.svg";
import shortsRecordingIcon from "../../../public/icons/recording-icon/shortsRecordingIcon.svg";
import Sheet from "react-modal-sheet";
import { useState } from "react";
import DubVideoSlider from "../organism/DubVideoSlider";
import useRecommendDubVideoListQuery from "@/apis/community/queries/useRecommendDubVideoListQuery";
import ErrorComponent from "./ErrorComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

interface Iprops {
  page: string;
}

export default function RecordingButton({ page }: Iprops) {
  // const languageIndex = useSelector((state: RootState) => {
  //   return state.languageTab.langType;
  // });

  const [isOpen, setOpen] = useState(false);

  // const { data, isLoading, isError, refetch } =
  //   useRecommendDubVideoListQuery(languageIndex);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center my-16">
  //       {/* <ScaleLoader color="#FF6D60" /> */}
  //       {"로딩 중입니다"}
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return <ErrorComponent onClick={() => refetch} retry={true} />;
  // }

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
          className="cursor-pointer"
        />
        <DubVideoSlider isOpen={isOpen} setOpen={setOpen} />
      </>
    );
  }
}
