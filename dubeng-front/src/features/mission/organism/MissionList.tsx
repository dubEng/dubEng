import MissionListItem from "../atoms/MissionListItem";
import { MyMissionForm } from "@/pages/mission";
import Link from "next/link";
interface DataList {
  getData: Array<MyMissionForm>;
}
export default function MissionList({ getData }: DataList) {
  console.log(getData);
  console.log();

  return (
    <section className="mx-16 grid grid-cols-2 justify-items-center">
      {getData &&
        getData.map((item) => (
          <Link href={`/dubbing/${item.videoId}`}>
            <MissionListItem
              isComplete={item.isComplete}
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
