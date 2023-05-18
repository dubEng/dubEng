import Background from "@/components/atoms/Background";
import { useState, useEffect } from "react";
import Lottie from "react-lottie-player";

interface Iprops{
    title: string;
}

const DubMissionCompleteModal = ({title} : Iprops) => {
  return (
    <div>
      <Background onClick={() => {}} />
      <div className="fixed left-[50%] top-[50%] z-50 h-350 w-350 translate-x-[-50%] translate-y-[-50%] rounded-30 border-1 border-dubgraylight bg-white text-center">
            <p className="text-16">{title}</p>
            <p className="text-16">미션을 완료하였습니다!</p>
        <div className="flex w-full flex-col items-center justify-center p-20">
          <Lottie
            loop
            path="/lottie/mission_success.json"
            play
            style={{ width: 200, height: 200 }}
          />
        </div>
      </div>
    </div>
  );
};

export default DubMissionCompleteModal;
