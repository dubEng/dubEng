import { AiOutlineGlobal } from "react-icons/ai";
import { LangType } from "../../../enum/statusType";
interface Iprops {
  langType: string;
}

export default function LanguageSelectTap({ langType }: Iprops) {
  if (langType === LangType.ENGLISH) {
    return (
      <div className="flex items-center">
        <AiOutlineGlobal className="mt-1 text-dubgray" size={18} />
        <p className="ml-2 text-14 text-dubgray">English</p>
      </div>
    );
  } else if (langType === LangType.KOREAN) {
    return (
      <div className="flex items-center">
        <AiOutlineGlobal className="mt-1 text-dubgray" size={18} />
        <p className="ml-2 text-14 text-dubgray">한국어</p>
      </div>
    );
  }
  return <></>;
}
