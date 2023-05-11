import DubSituationCard from "../atoms/DubSituationCard";
import { SituationType } from "../../../enum/statusType";
import { useState } from "react";
import DubVideoSlider from "../../../components/organism/DubVideoSlider";

export default function DubSituation() {
  const [isOpen, setOpen] = useState(false);

  function handleSituationCard(e: { target: any }) {
    console.log(e.target);
  }

  return (
    <div className="w-358 grid gap-8 grid-cols-2">
      <DubSituationCard
        type={SituationType.PLACE_1}
        onClick={handleSituationCard}
      />
      <DubSituationCard
        type={SituationType.PLACE_2}
        onClick={handleSituationCard}
      />
      <DubSituationCard
        type={SituationType.COUNTRY}
        onClick={handleSituationCard}
      />
      <DubSituationCard
        type={SituationType.EMOTION}
        onClick={handleSituationCard}
      />

      <DubVideoSlider videoList={[]} isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
}
