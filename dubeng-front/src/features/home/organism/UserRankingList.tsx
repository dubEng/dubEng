import ScaleLoader from "react-spinners/ScaleLoader";
import UserRankingListItem from "../molecules/UserRankingListItem";
import useHomeRankQuery from "../../../apis/home/queries/useHomeRankQuery";
import ErrorComponent from "../../../components/atoms/ErrorComponent";
import DefaultImage from "../../../../public/images/default/mic_profile.png";

export default function UserRankingList() {
  const rank = useHomeRankQuery();

  if (rank.isLoading) {
    return (
      <div className="flex justify-center items-center my-16">
        <ScaleLoader color="#FF6D60" />
      </div>
    );
  }

  if (rank.isError) {
    return <ErrorComponent onClick={() => rank.refetch} retry={true} />;
  }

  return (
    <section className="mx-16">
      <div className="grid grid-cols-12 mb-8 gap-8">
        <div className="col-span-3"></div>
        <div className="col-span-5 text-13 text-dubblack"> 닉네임</div>
        <div className="text-13 text-dubblack flex items-center justify-center col-span-2">
          녹음시간
        </div>
        <div className="text-13 text-dubblack flex items-center justify-center col-span-2">
          더빙 수
        </div>
      </div>
      {rank.data &&
        rank.data.map((item: any, index: number) => (
          <UserRankingListItem
            userId={item.id}
            key={item.id}
            imageUrl={item.profileImage ?? DefaultImage}
            introduce={item.description}
            nickname={item.nickName}
            ranking={index}
            dubingCount={item.recordCount}
            recordingTime={item.totalRecTime}
          />
        ))}
    </section>
  );
}
