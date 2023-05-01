import MissionList from "@/features/mission/organism/MissionList";

export default function MissionPage() {
  return (
    <div className="container mx-auto">
      <p className="flex justify-start mx-16 text-19 font-bold mt-24 mb-16">
        나의 섬
      </p>
      <p className="flex justify-start mx-16 text-19 font-bold mt-24 mb-16">
        도전과제
      </p>
      <MissionList />
    </div>
  );
}
