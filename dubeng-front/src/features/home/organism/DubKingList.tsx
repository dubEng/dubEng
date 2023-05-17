import ScaleLoader from "react-spinners/ScaleLoader";
import DubKingItem from "../molecules/DubKingItem";
import useHomeDubKingQuery from "../../../apis/home/queries/useHomeDubKingQuery";
import ErrorComponent from "../../../components/atoms/ErrorComponent";

import ProfileOne from "../../../../public/images/dump/profile_01.svg";
import ProfileTwo from "../../../../public/images/dump/profile_02.svg";
import ProfileThree from "../../../../public/images/dump/profile_03.svg";
import { DubKing } from "@/types/DubKing";

export default function DubKingList() {
  const dubKingList: DubKing[] = [
    {
      ranking: 1,
      nickname: "개발진뽕",
      totalCount: 62,
      dubKingImageUrl: ProfileOne,
    },
    {
      ranking: 2,
      nickname: "개발진J",
      totalCount: 37,
      dubKingImageUrl: ProfileTwo,
    },
    {
      ranking: 3,
      nickname: "개발진짛",
      totalCount: 20,
      dubKingImageUrl: ProfileThree,
    },
  ];
  // const dubKing = useHomeDubKingQuery();

  // if (dubKing.isLoading) {
  //   return (
  //     <div className="flex justify-center items-center my-16">
  //       <ScaleLoader color="#FF6D60" />
  //     </div>
  //   );
  // }

  // if (dubKing.isError) {
  //   return <ErrorComponent onClick={() => dubKing.refetch} retry={true} />;
  // }

  return (
    <section className="mx-16 flex justify-around">
      {dubKingList && (
        <>
          <DubKingItem
            nickname={dubKingList[1].nickname?? ""}
            ranking={dubKingList[1].ranking}
            dubKingImageUrl={dubKingList[1].dubKingImageUrl ?? ""}
            totalCount={dubKingList[1].totalCount}
          />
          <DubKingItem
            nickname={dubKingList[0].nickname ?? ""}
            ranking={dubKingList[0].ranking}
            dubKingImageUrl={dubKingList[0].dubKingImageUrl ?? ""}
            totalCount={dubKingList[0].totalCount}
          />
          <DubKingItem
            nickname={dubKingList[2].nickname ?? ""}
            ranking={dubKingList[2].ranking}
            dubKingImageUrl={dubKingList[2].dubKingImageUrl ?? ""}
            totalCount={dubKingList[2].totalCount}
          />
        </>
      )}
      {/* {dubKing.data && (
        <>
          <DubKingItem
            nickname={dubKing.data[1].nickname?? ""}
            ranking={dubKing.data[1].ranking}
            dubKingImageUrl={dubKing.data[1].dubKingImageUrl ?? ""}
            totalCount={dubKing.data[1].totalCount}
          />
          <DubKingItem
            nickname={dubKing.data[0].nickname ?? ""}
            ranking={dubKing.data[0].ranking}
            dubKingImageUrl={dubKing.data[0].dubKingImageUrl ?? ""}
            totalCount={dubKing.data[0].totalCount}
          />
          <DubKingItem
            nickname={dubKing.data[2].nickname ?? ""}
            ranking={dubKing.data[2].ranking}
            dubKingImageUrl={dubKing.data[2].dubKingImageUrl ?? ""}
            totalCount={dubKing.data[2].totalCount}
          />
        </>
      )} */}
    </section>
  );
}
