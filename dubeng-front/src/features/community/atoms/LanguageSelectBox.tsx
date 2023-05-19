<<<<<<< HEAD
export default function LanguageSelectBox() {
=======
import { useDispatch } from "react-redux";
import { LangType } from "../../../enum/statusType";
import {
  setTabEnglish,
  setTabKorean,
} from "../../../stores/community/languageTabSlice";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

interface Iprops {
  langType: string;
}

export default function LanguageSelectBox({ langType }: Iprops) {
  const MySwal = withReactContent(Swal);
  const router = useRouter();

  const dispatch = useDispatch();

  function handleKoreanTab() {
    // 실제로 작업할 때에는 밑에 주석 풀고 진행해야 함
    dispatch(setTabKorean());
  }
  function handleEnglishTab() {
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
>>>>>>> develop-front
  return <></>;
}
