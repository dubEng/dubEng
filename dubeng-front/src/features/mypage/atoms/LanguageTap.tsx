import { LangType } from "@/enum/statusType";
import { useState } from "react";

interface Iprops {
  myPageLangIndex: string;
  handleMyPageLangIndex: (presentIndex: LangType) => void;
}

export default function LanguageTap({
  myPageLangIndex,
  handleMyPageLangIndex,
}: Iprops) {
  function handleEnglishTab() {
    console.log("English 누름");
    handleMyPageLangIndex(LangType.ENGLISH);
  }
  function handleKoreanTab() {
    console.log("한국어 누름");
    handleMyPageLangIndex(LangType.KOREAN);
  }

  if (myPageLangIndex === LangType.ENGLISH) {
    return (
      <div>
        <div className="flex ml-4 justify-between">
          <div className="flex">
            <p className="text-16 text-dubblack font-semibold">English</p>
            <p
              className="ml-16 text-16 text-dubblack font-semibold"
              onClick={handleKoreanTab}
            >
              한국어
            </p>
          </div>
        </div>
        <div className="mt-8 z-0 w-358 h-2 bg-dubgraylight"></div>
        <div className="relative -top-2 w-65 h-2 bg-dubblack"></div>
      </div>
    );
  } else if (myPageLangIndex === LangType.KOREAN) {
    return (
      <div>
        <div className="flex ml-4 justify-between">
          <div className="flex">
            <p
              className="text-16 text-dubblack font-semibold"
              onClick={handleEnglishTab}
            >
              English
            </p>
            <p className="ml-16 text-16 text-dubblack font-semibold">한국어</p>
          </div>
        </div>
        <div className="mt-8 z-0 w-358 h-2 bg-dubgraylight"></div>
        <div className="ml-69 relative -top-2 w-52 h-2 bg-dubblack"></div>
      </div>
    );
  }
  return <></>;
}
