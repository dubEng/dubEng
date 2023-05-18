import { MissionItem } from "@/types/MissionItem";
import Image from "next/image";

export default function MissionListItem({
  assetUrl,
  title,
  color,
}: MissionItem) {
  return (
    <div className="w-150 h-201 relative rounded-tl-lg bg-[#F8F8F8] rounded-lg mx-12 mb-32">
      <div className={getBoxStyle(color)}>
        <div className="w-80 h-80 rounded-lg">
          <Image
            src={`/assets/${assetUrl}.png`}
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

  //TODO: twin.macro 적용 해야함
  function getBoxStyle(color: string): string {
    return `w-150 h-150 rounded-tl-lg rounded-tr-lg bg-[#A6BAF5] flex justify-center items-center`;
  }
}
