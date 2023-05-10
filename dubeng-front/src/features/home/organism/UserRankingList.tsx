import ScaleLoader from "react-spinners/ScaleLoader";
import UserRankingListItem from "../molecules/UserRankingListItem";
import useHomeRankQuery from "@/apis/home/queries/useHomeRankQuery";
import ErrorComponent from "@/components/atoms/ErrorComponent";

export default function UserRankingList() {
  const rank =  useHomeRankQuery();

  if (rank.isLoading) {
    return (
      <div className="container mx-auto">
        <ScaleLoader color="#FF6D60" />;
      </div>
    );
  }

  if (rank.isError) {
    return (
      <div className="container mx-auto">
        <ErrorComponent />;
      </div>
    );
  }

  return (
    <section className="mx-16">
      <div className="grid grid-cols-12 mb-8 gap-8">
        <div className="col-span-3"></div>
        <div className="col-span-5 text-13 text-dubblack"> 닉네임</div>
        <div className="text-13 text-dubblack flex items-center justify-center col-span-2">녹음시간</div>
        <div className="text-13 text-dubblack flex items-center justify-center col-span-2">더빙 수</div>
      </div>
      {rank.data &&
        rank.data.map((item: any) => (
          <UserRankingListItem
            key={item.ranking}
            imageUrl={item.imageUrl}
            introduce={item.introduce}
            nickname={item.nickname}
            ranking={item.ranking}
            dubingCount={item.dubingCount}
            recordingTime={item.recordingTime}
          />
        ))}
    </section>
  );
}
