import { LangType, SituationType } from "../../../enum/statusType";

interface Iprops {
  type: string;
  langType: string;
  // onClick: (e: any) => void;
}

export default function DubSituationCard({ type, langType }: Iprops) {
  if (type === SituationType.PLACE_1) {
    if (langType === LangType.ENGLISH) {
      return (
        <div className="flex flex-col justify-center items-center rounded-8 w-175 h-80 bg-dubcoral text-white">
          <p className="font-bold text-18">🍕식당에서</p>
          <p className="text-10">식당에서 쓸 수 있는 유용한 표현</p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center rounded-8 w-175 h-80 bg-dubcoral text-white">
          <p className="font-bold text-18">하이킥 시리즈</p>
          <p className="text-10">국민 시트콤 하이킥을 더빙으로?</p>
        </div>
      );
    }
  } else if (type === SituationType.PLACE_2) {
    if (langType === LangType.ENGLISH) {
      return (
        <div className="flex flex-col justify-center items-center rounded-8 w-175 h-80 bg-dubivory">
          <p className="font-bold text-18 text-dubblack">💻회사에서</p>
          <p className="text-10 text-dubgray">
            직장 상사에게 영어로 어떻게 말하지?
          </p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center rounded-8 w-175 h-80 bg-dubivory">
          <p className="font-bold text-18 text-dubblack">무한도전 시리즈</p>
          <p className="text-10 text-dubgray">클래식 이즈 더 베스트!</p>
        </div>
      );
    }
  } else if (type === SituationType.EMOTION) {
    if (langType === LangType.ENGLISH) {
      return (
        <div className="flex flex-col justify-center items-center rounded-8 w-175 h-80 bg-dubblue text-white">
          <p className="font-bold text-18">😁#기쁨</p>
          <p className="text-10">행복한 이 기분, 영어로 해보자!</p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center rounded-8 w-175 h-80 bg-dubblue text-white">
          <p className="font-bold text-18">더글로리</p>
          <p className="text-10">브라보~ 더빙 멋지다 연진아!</p>
        </div>
      );
    }
  } else if (type === SituationType.COUNTRY) {
    if (langType === LangType.ENGLISH) {
      return (
        <div className="flex flex-col justify-center items-center rounded-8 w-175 h-80 bg-dubpink text-dubblack">
          <p className="font-bold text-18">🗽미국 America</p>
          <p className="text-10">미국권 영어 한 번 배워볼까?</p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center rounded-8 w-175 h-80 bg-dubpink text-dubblack">
          <p className="font-bold text-18">타짜</p>
          <p className="text-10">덥잉 할 수 있어!</p>
        </div>
      );
    }
  }
  return <></>;
}
