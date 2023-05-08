import DubSituationCard from "../atoms/DubSituationCard";
import { SituationType } from "../../../enum/statusType";

export default function DubSituation() {
  return (
    <div className="w-358 grid gap-8 grid-cols-2">
      <DubSituationCard type={SituationType.PLACE_1} />
      <DubSituationCard type={SituationType.PLACE_2} />
      <DubSituationCard type={SituationType.COUNTRY} />
      <DubSituationCard type={SituationType.EMOTION} />
    </div>
  );
}
