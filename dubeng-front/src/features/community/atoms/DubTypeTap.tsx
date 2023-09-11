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
    dispatch(setTabDubVideo());
  }
  function handleDubProductTab() {
    dispatch(setTabDubProduct());
  }
  function handleLanguageButton() {
    setIsLanguageButtonOpen(!isLanguageButtonOpen);
  }

  useEffect(() => {
    setIsLanguageButtonOpen(false);
  }, [langType]);

  if (dubType === DubType.DUB_VIDEO) {
    return (
      <div className="w-full">
        <div className="flex ml-4 justify-between">
          <div className="flex">
            <button className="text-16 text-dubblack font-semibold">
              더빙 콘텐츠
            </button>
            <button
              className="ml-16 text-16 text-dubblack font-semibold"
              onClick={handleDubProductTab}
            >
              더빙 작품
            </button>
          </div>
          <LanguageSelectTap
            langType={langType}
            onClick={handleLanguageButton}
          />
          <div className="absolute right-0 top-24">
            {isLanguageButtonOpen && <LanguageSelectBox langType={langType} />}
          </div>
        </div>
        <div className="mt-8 z-0 w-full h-2 bg-dubgraylight"></div>
        <div className="relative -top-2 w-84 h-2 bg-dubblack"></div>
      </div>
    );
  } else if (dubType === DubType.DUB_PRODUCT) {
    return (
      <div className="w-full">
        <div className="flex ml-4 justify-between">
          <div className="flex">
            <button
              className="text-16 text-dubblack font-semibold"
              onClick={handleDubVideoTab}
            >
              더빙 콘텐츠
            </button>
            <button className="ml-16 text-16 text-dubblack font-semibold">
              더빙 작품
            </button>
          </div>
          <LanguageSelectTap
            langType={langType}
            onClick={handleLanguageButton}
          ></LanguageSelectTap>
          <div className="absolute right-0 top-24">
            {isLanguageButtonOpen && <LanguageSelectBox langType={langType} />}
          </div>
        </div>
        <div className="mt-8 z-0 w-full h-2 bg-dubgraylight"></div>
        <div className="ml-88 relative -top-2 w-70 h-2 bg-dubblack"></div>
      </div>
    );
  }

  return <></>;
}
