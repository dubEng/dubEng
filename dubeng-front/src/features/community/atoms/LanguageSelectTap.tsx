import { AiOutlineGlobal } from "react-icons/ai";
import { LangType } from "../../../enum/statusType";
interface Iprops {
  langType: string;
  onClick: () => void;
}

export default function LanguageSelectTap({ langType, onClick }: Iprops) {
  if (langType === LangType.ENGLISH) {
    return (
      <div className="flex items-center cursor-pointer" onClick={onClick}>
        <AiOutlineGlobal className="mt-1 text-dubgray" size={18} />
        <p className="ml-2 text-14 text-dubgray">English 콘텐츠</p>
      </div>
    );
  } else if (langType === LangType.KOREAN) {
    return (
      <div className="flex items-center cursor-pointer" onClick={onClick}>
        <AiOutlineGlobal className="mt-1 text-dubgray" size={18} />
        <p className="ml-2 text-14 text-dubgray">한국어 콘텐츠</p>
      </div>
    );
  }
  return <></>;
}
