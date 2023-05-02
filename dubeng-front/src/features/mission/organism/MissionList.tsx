import { MissionItem } from "@/types/MissionItem";
import MissionImageOne from "../../../../public/images/dump/mission_image_01.svg";
import MissionImageTwo from "../../../../public/images/dump/mission_image_02.svg";
import MissionImageThree from "../../../../public/images/dump/mission_image_03.svg";
import MissionImageFour from "../../../../public/images/dump/mission_image_04.svg";
import MissionListItem from "../atoms/MissionListItem";

export default function MissionList() {
  const missionList: MissionItem[] = [
    {
      imageUrl: MissionImageOne,
      missionContent: "동동이 놀리기 영상 5번 더빙",
      color: "#A6BAF5",
    },
    {
      imageUrl: MissionImageOne,
      missionContent: "언도도씨 노래 영상 15번 더빙",
      color: "#ED73A4",
    },
    {
      imageUrl: MissionImageOne,
      missionContent: "지희 생일 축하 영상 10번 더빙",
      color: "#FCD964",
    },
    {
      imageUrl: MissionImageOne,
      missionContent: "아영쓰 뉴진스 따라잡기 영상 30번 더빙",
      color: "#578939",
    },
  ];

  return (
    <section className="mx-16 grid grid-cols-2 justify-items-center">
      {missionList &&
        missionList.map((item) => (
          <MissionListItem
            color={item.color}
            missionContent={item.missionContent}
            imageUrl={item.imageUrl}
            key={item.missionContent}
          />
        ))}
    </section>
  );
}
