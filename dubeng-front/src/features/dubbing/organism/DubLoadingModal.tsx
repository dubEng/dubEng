import Background from "@/components/atoms/Background";
import { useState, useEffect } from "react";
import Lottie from "react-lottie-player";

const DubLoadingModal = () => {
  return (
    <div>
      <Background onClick={() => {}} />
      <div className="fixed left-[50%] top-[50%] z-50 h-250 w-250 translate-x-[-50%] translate-y-[-50%] rounded-30 border-1 border-dubgraylight bg-white text-center">
        <div className="flex w-full flex-col items-center justify-center p-20">
          <Lottie
            loop
            path="/lottie/video.json"
            play
            style={{ width: 150, height: 150 }}
          />
          <p className="text-16">더빙 영상을 완성하고 있습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default DubLoadingModal;
