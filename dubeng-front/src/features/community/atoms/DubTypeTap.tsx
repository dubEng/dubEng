import {
  setTabDubProduct,
  setTabDubVideo,
} from "../../../stores/community/communityTabSlice";
import { DubType } from "../../../enum/statusType";
import { useDispatch } from "react-redux";
import LanguageSelectTap from "./LanguageSelectTap";
import { useEffect, useState } from "react";
import LanguageSelectBox from "./LanguageSelectBox";

interface Iprops {
  dubType: string;
  langType: string;
}

export default function DubTypeTap({ dubType, langType }: Iprops) {
  const [isLanguageButtonOpen, setIsLanguageButtonOpen] = useState(false);

  const dispatch = useDispatch();

  function handleDubVideoTab() {
    console.log("더빙 콘텐츠 누름");
    dispatch(setTabDubVideo());
  }
  function handleDubProductTab() {
    console.log("더빙 작품 누름");
    dispatch(setTabDubProduct());
  }
  function handleLanguageButton() {
    console.log("언어버튼 눌렀다!");
    setIsLanguageButtonOpen(!isLanguageButtonOpen);
    window.alert("한국어 콘텐츠는 Coming soon!");
  }

  useEffect(() => {
    setIsLanguageButtonOpen(false);
  }, [langType]);

  if (dubType === DubType.DUB_VIDEO) {
    return (
      <div>
        <div className="flex ml-4 justify-between">
          <div className="flex">
            <p className="text-16 text-dubblack font-semibold">더빙 콘텐츠</p>
            <p
              className="ml-16 text-16 text-dubblack font-semibold"
              onClick={handleDubProductTab}
            >
              더빙 작품
            </p>
          </div>
          <LanguageSelectTap
            langType={langType}
            onClick={handleLanguageButton}
          />
          <div className="absolute right-0 top-24">
            {isLanguageButtonOpen && <LanguageSelectBox langType={langType} />}
          </div>
        </div>
        <div className="mt-8 z-0 w-358 h-2 bg-dubgraylight"></div>
        <div className="relative -top-2 w-84 h-2 bg-dubblack"></div>
      </div>
    );
  } else if (dubType === DubType.DUB_PRODUCT) {
  }
  {
    return (
      <div>
        <div className="flex ml-4 justify-between">
          <div className="flex">
            <p
              className="text-16 text-dubblack font-semibold"
              onClick={handleDubVideoTab}
            >
              더빙 콘텐츠
            </p>
            <p className="ml-16 text-16 text-dubblack font-semibold">
              더빙 작품
            </p>
          </div>
          <LanguageSelectTap
            langType={langType}
            onClick={handleLanguageButton}
          />
          <div className="absolute right-0 top-24">
            {isLanguageButtonOpen && <LanguageSelectBox langType={langType} />}
          </div>
        </div>
        <div className="mt-8 z-0 w-358 h-2 bg-dubgraylight"></div>
        <div className="ml-88 relative -top-2 w-70 h-2 bg-dubblack"></div>
      </div>
    );
  }

  return <></>;
}
