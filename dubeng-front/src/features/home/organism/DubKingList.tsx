import { DubKing } from "@/types/DubKing";
import DubKingItem from "../molecules/DubKingItem";
import ProfileOne from "../../../../public/images/dump/profile_01.svg";
import ProfileTwo from "../../../../public/images/dump/profile_02.svg";
import ProfileThree from "../../../../public/images/dump/profile_03.svg";

export default function DubKingList() {
  const dubKingList: DubKing[] = [
    {
      ranking: 1,
      nickname: "김자민",
      totalCount: 38560,
      dubKingImageUrl: ProfileOne,
    },
    {
      ranking: 2,
      nickname: "김동동",
      totalCount: 3856,
      dubKingImageUrl: ProfileTwo,
    },
    {
      ranking: 3,
      nickname: "김언도",
      totalCount: 385,
      dubKingImageUrl: ProfileThree,
    },
  ];

  return (
    <section className="mx-16 flex justify-around">
      <DubKingItem nickname={dubKingList[1].nickname} ranking={dubKingList[1].ranking} dubKingImageUrl={dubKingList[1].dubKingImageUrl} totalCount={dubKingList[1].totalCount} />
      <DubKingItem nickname={dubKingList[0].nickname} ranking={dubKingList[0].ranking} dubKingImageUrl={dubKingList[0].dubKingImageUrl} totalCount={dubKingList[0].totalCount} />
      <DubKingItem nickname={dubKingList[2].nickname} ranking={dubKingList[2].ranking} dubKingImageUrl={dubKingList[2].dubKingImageUrl} totalCount={dubKingList[2].totalCount} />
    </section>
  );
}
