import { SituationType } from "../../../enum/statusType";

interface Iprops {
  type: string;
  // onClick: (e: any) => void;
}

export default function DubSituationCard({ type }: Iprops) {
  if (type === SituationType.PLACE_1) {
    return (
      <div className="flex flex-col justify-center items-center rounded-8 w-175 h-80 bg-dubcoral text-white">
        <p className="font-bold text-14">🍕식당에서</p>
        <p className="text-10">식당에서 쓸 수 있는 유용한 표현</p>
      </div>
    );
  } else if (type === SituationType.PLACE_2) {
    return (
      <div className="flex flex-col justify-center items-center rounded-8 w-175 h-80 bg-dubivory">
        <p className="font-bold text-14 text-dubblack">💻회사에서</p>
        <p className="text-10 text-dubgray">
          직장 상사에게 영어로 어떻게 말하지?
        </p>
      </div>
    );
  } else if (type === SituationType.EMOTION) {
    return (
      <div className="flex flex-col justify-center items-center rounded-8 w-175 h-80 bg-dubblue text-white">
        <p className="font-bold text-14">😁#기쁨</p>
        <p className="text-10">행복한 이 기분, 영어로 해보자!</p>
      </div>
    );
  } else if (type === SituationType.COUNTRY) {
    return (
      <div className="flex flex-col justify-center items-center rounded-8 w-175 h-80 bg-dubpink text-dubblack">
        <p className="font-bold text-14">🗽미국 America</p>
        <p className="text-10">미국권 영어 한 번 배워볼까?</p>
      </div>
    );
  }
  return <></>;
}
