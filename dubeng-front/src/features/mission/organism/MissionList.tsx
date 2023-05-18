import MissionListItem from "../atoms/MissionListItem";
import { MyMissionForm } from "@/pages/mission";
interface DataList {
  getData: Array<MyMissionForm>;
}
export default function MissionList({ getData }: DataList) {
  console.log(getData);
  console.log();

  return (
    <section className="mx-16 grid grid-cols-2 gap-4 justify-items-center">
      {getData &&
        getData.map((item) => (
          <MissionListItem
            isComplete={item.isComplete}
            color={item.color}
            title={item.title}
            assetUrl={item.assets}
            videoId={item.videoId}
            key={item.videoId}
          />
        ))}
      <div className="h-80"></div>
    </section>
  );
}
