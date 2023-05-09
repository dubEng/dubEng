import { useDispatch } from "react-redux";
import { LangType } from "../../../enum/statusType";
import {
  setTabEnglish,
  setTabKorean,
} from "../../../stores/community/languageTabSlice";
interface Iprops {
  langType: string;
}

export default function LanguageSelectBox({ langType }: Iprops) {
  const dispatch = useDispatch();

  function handleKoreanTab() {
    console.log("한국어탭 누름");
    dispatch(setTabKorean());
  }
  function handleEnglishTab() {
    console.log("영어탭 누름");
    dispatch(setTabEnglish());
  }

  if (langType === LangType.ENGLISH) {
    return (
      <div className="flex flex-col w-96">
        <button
          disabled={true}
          className="rounded-t-4 px-24 py-8 bg-white border-1 border-dubgraydeep text-14 text-dubcoral"
        >
          English
        </button>
        <button
          className="relative -top-1 rounded-b-4 px-24 py-8 bg-white border-1 border-dubgraydeep text-14 text-dubgray"
          onClick={handleKoreanTab}
        >
          한국어
        </button>
      </div>
    );
  } else if (langType === LangType.KOREAN) {
    return (
      <div className="flex flex-col w-96">
        <button
          className="rounded-t-4 px-24 py-8 bg-white border-1 border-dubgraydeep text-14 text-dubgray"
          onClick={handleEnglishTab}
        >
          English
        </button>
        <button
          disabled={true}
          className="relative -top-1 rounded-b-4 px-24 py-8 bg-white border-1 border-dubgraydeep text-14 text-dubcoral"
        >
          한국어
        </button>
      </div>
    );
  }
  return <></>;
}
