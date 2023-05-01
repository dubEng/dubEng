import Image from "next/image";

interface Iprops {
  imageUrl: string;
  missionContent: string;
  color: string;
}

export default function MissionListItem({
  imageUrl,
  missionContent,
  color,
}: Iprops) {
  return (
    <div className="w-150 h-201 relative rounded-tl-lg bg-white rounded-lg">
      <div className={getBoxStyle(color)}>
        <div className="w-80 h-80 rounded-lg">
          <Image
            src={imageUrl}
            alt={"objectImage"}
            width={80}
            height={80}
            className="rounded-lg"
          />
        </div>
      </div>
      <p className="text-14 font-bold text-dubblack text-center">{missionContent}</p>
    </div>
  );

  function getBoxStyle(color: string): string {
    return `w-150 h-150 rounded-tl-lg rounded-tr-lg bg-[${color}] flex justify-center items-center`;
  }
}
