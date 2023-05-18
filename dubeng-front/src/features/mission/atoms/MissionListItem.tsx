import { MissionItem } from "@/types/MissionItem";
import Image from "next/image";
import { MdOutlineLock } from "react-icons/md";

export default function MissionListItem({
  isComplete,
  assetUrl,
  title,
  color,
}: MissionItem) {
  if (isComplete) {
    return (
      <div className="w-150 h-201 relative rounded-tl-lg bg-[#F8F8F8] rounded-lg mx-12 mb-32">
        <div className={getBoxStyle(color)}>
          <div className="w-80 h-80 rounded-lg">
            <Image
              src={`/assets/${assetUrl}.PNG`}
              alt={"objectImage"}
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
        </div>
        <p className="text-14 font-bold text-dubblack text-center">{title}</p>
      </div>
    );
  } else {
    return (
      <div className="w-150 h-201 relative rounded-tl-lg bg-[#F8F8F8] rounded-lg mx-12 mb-32">
        <div className={getBoxStyle(color)}>
          <div className="relative w-80 h-80 rounded-lg">
            <Image
              src={`/assets/${assetUrl}.PNG`}
              alt={"objectImage"}
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div className="opacity-50 absolute top-0 left-0 w-80 h-80 rounded-18"></div>
            <MdOutlineLock
              size={20}
              className="absolute top-40 left-40 text-dubgraylight"
            />
          </div>
        </div>
        <p className="text-14 font-bold text-dubblack text-center">{title}</p>
      </div>
    );
  }

  //TODO: twin.macro 적용 해야함
  function getBoxStyle(color: string): string {
    return `w-150 h-150 rounded-tl-lg rounded-tr-lg bg-${color} flex justify-center items-center`;
  }
}
