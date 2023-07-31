import { LangType } from "@/enum/statusType";

interface Iprops {
  index: number;
  content: string;
  translateContent: string;
  langType: LangType;
  isSelected: boolean;
}

export default function DubScriptListItem({
  index,
  content,
  translateContent,
  langType,
  isSelected,
}: Iprops) {
  if (isSelected) {
    return (
      <div className={`script-element-${index} mb-8 mx-20 flex flex-col items-center`} key={index}>
        <p className="text-16 text-dubblue text-center">{content}</p>
        {langType === LangType.ENGLISH ? (
          <p className="text-14 text-[#8E8D8D] text-center">{translateContent}</p>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className={`script-element-${index} mb-8 mx-20 flex flex-col items-center`} key={index}>
        <p className="text-16 text-white text-center">{content}</p>
        {langType === LangType.ENGLISH ? (
          <p className="text-14 text-[#8E8D8D] text-center">{translateContent}</p>
        ) : null}
      </div>
    );
  }
}
