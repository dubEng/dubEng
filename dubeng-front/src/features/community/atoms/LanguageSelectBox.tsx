import { LangType } from "../../../enum/statusType";
interface Iprops {
  langType: string;
}

export default function LanguageSelectBox({ langType }: Iprops) {
  if (langType === LangType.ENGLISH) {
    return (
      <div className="flex flex-col w-96">
        <button
          disabled={true}
          className="rounded-t-4 px-24 py-8 bg-white border-1 border-dubgraydeep text-14 text-dubcoral"
        >
          English
        </button>
        <button className="relative -top-1 rounded-b-4 px-24 py-8 bg-white border-1 border-dubgraydeep text-14 text-dubgray">
          한국어
        </button>
      </div>
    );
  } else if (langType === LangType.KOREAN) {
    return (
      <div className="flex flex-col w-96">
        <button className="rounded-t-4 px-24 py-8 bg-white border-1 border-dubgraydeep text-14 text-dubgray">
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
