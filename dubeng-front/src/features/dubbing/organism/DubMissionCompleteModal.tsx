import Background from "@/components/atoms/Background";
import CommonButton from "@/components/atoms/CommonButton";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import Lottie from "react-lottie-player";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../stores/store";
import { useRouter } from "next/router";
import { setClose } from "../../../stores/mission/missionModalSlice";

const DubMissionCompleteModal = () => {
  const dispatch = useDispatch();
  const route = useRouter();

  const { isOpen, title } = useSelector(
    (state: RootState) => state.missionModal
  );

  function handleCloseButton() {
    dispatch(setClose());
  }


  function handleGoMissionPage() {
    dispatch(setClose());
    route.push("/mission");
  }

  return isOpen ? (
    <div>
      <Background onClick={handleCloseButton} />
      <div className="fixed left-[50%] top-[50%] z-50 h-380 w-350 translate-x-[-50%] translate-y-[-50%] rounded-30 border-1 border-dubgraylight bg-white text-center">
        <div className="flex flex-row justify-end mt-8 mr-8 h-16">
          <button onClick={handleCloseButton}>
            <MdClose className="my-8 mr-8" size={24} />
          </button>
        </div>
        <div className="flex w-full flex-col items-center justify-center p-16">
          <p className="text-18 font-semibold">축하합니다!! 🎉</p>
          <Lottie
            loop
            path="/lottie/mission_success.json"
            play
            style={{ width: 160, height: 160 }}
          />
          <p className="text-18 font-semibold">{title}</p>
          <p className="text-16 mb-24">미션을 완료하였습니다!</p>
          <CommonButton children="도전과제 페이지 가기" onClick={handleGoMissionPage} />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default DubMissionCompleteModal;
