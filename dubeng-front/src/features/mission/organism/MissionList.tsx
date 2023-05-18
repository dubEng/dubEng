import MissionListItem from "../atoms/MissionListItem";
import { MyMissionForm } from "@/pages/mission";
import Link from "next/link";
interface ClearDataList{
  missionClearData:Array<MyMissionForm>;
}
export default function MissionList({missionClearData}:ClearDataList) {
  console.log(missionClearData);
  
  return (
    <section className="mx-16 grid grid-cols-2 justify-items-center">
      {missionClearData &&
        missionClearData.map((item) => (
          <Link href={`/dubbing/${item.videoId}`}>
          <MissionListItem
            color={item.color}
            title={item.title}
            assetUrl={item.assets}
            key={item.videoId}
          />
          </Link>
        ))}
        <div className="h-80"></div>
    </section>
  );
}
