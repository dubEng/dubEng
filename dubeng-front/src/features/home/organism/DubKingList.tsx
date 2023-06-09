import ScaleLoader from "react-spinners/ScaleLoader";
import DubKingItem from "../molecules/DubKingItem";
import useHomeDubKingQuery from "../../../apis/home/queries/useHomeDubKingQuery";
import ErrorComponent from "../../../components/atoms/ErrorComponent";

import DefaultImage from "../../../../public/images/default/mic_profile.png";

import ProfileOne from "../../../../public/images/dump/profile_01.svg";
import ProfileTwo from "../../../../public/images/dump/profile_02.svg";
import ProfileThree from "../../../../public/images/dump/profile_03.svg";
import { DubKing } from "@/types/DubKing";

export default function DubKingList() {
  // const dubKingList: DubKing[] = [
  //   {
  //     ranking: 1,
  //     nickname: "개발진뽕",
  //     totalCount: 62,
  //     dubKingImageUrl: ProfileOne,
  //   },
  //   {
  //     ranking: 2,
  //     nickname: "개발진J",
  //     totalCount: 37,
  //     dubKingImageUrl: ProfileTwo,
  //   },
  //   {
  //     ranking: 3,
  //     nickname: "개발진짛",
  //     totalCount: 20,
  //     dubKingImageUrl: ProfileThree,
  //   },
  // ];
  const { data, isLoading, isError, refetch } = useHomeDubKingQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-16">
        <ScaleLoader color="#FF6D60" />
      </div>
    );
  }

  if (isError) {
    return <ErrorComponent onClick={() => refetch} retry={true} />;
  }

  if (data.length >= 3) {
    return (
      <section className="mx-16 flex justify-around">
        {/* {dubKingList && (
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
        )} */}
        {data && (
          <>
            <DubKingItem
              userId={data[1].userId}
              nickname={data[1].nickname ?? ""}
              ranking={2}
              dubKingImageUrl={data[1].profileImage ?? DefaultImage}
              totalCount={data[1].totalVote}
            />
            <DubKingItem
              userId={data[0].userId}
              nickname={data[0].nickname ?? ""}
              ranking={1}
              dubKingImageUrl={data[0].profileImage ?? DefaultImage}
              totalCount={data[0].totalVote}
            />
            <DubKingItem
              userId={data[2].userId}
              nickname={data[2].nickname ?? ""}
              ranking={3}
              dubKingImageUrl={data[2].profileImage ?? DefaultImage}
              totalCount={data[2].totalVote}
            />
          </>
        )}
      </section>
    );
  }
  return <></>;
}
