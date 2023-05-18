import { MissionItem } from "@/types/MissionItem";
import MissionImageOne from "../../../../public/images/dump/mission_image_01.svg";
import MissionImageTwo from "../../../../public/images/dump/mission_image_02.svg";
import MissionImageThree from "../../../../public/images/dump/mission_image_03.svg";
import MissionImageFour from "../../../../public/images/dump/mission_image_04.svg";
import MissionListItem from "../atoms/MissionListItem";
import { MyMissionForm } from "@/pages/mission";
interface ClearDataList{
  missionClearData:Array<MyMissionForm>;
}
export default function MissionList({missionClearData}:ClearDataList) {
  console.log(missionClearData);
  
  return (
    <section className="mx-16 grid grid-cols-2 justify-items-center">
      {missionClearData &&
        missionClearData.map((item) => (
          <MissionListItem
            color={item.color}
            title={item.title}
            assetUrl={item.assets}
            key={item.videoId}
          />
        ))}
        <div className="h-80"></div>
    </section>
  );
}
