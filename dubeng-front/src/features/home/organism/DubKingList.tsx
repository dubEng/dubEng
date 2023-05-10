import ScaleLoader from "react-spinners/ScaleLoader";
import DubKingItem from "../molecules/DubKingItem";
import useHomeDubKingQuery from "@/apis/home/queries/useHomeDubKingQuery";
import ErrorComponent from "../../../components/atoms/ErrorComponent";

export default function DubKingList() {
  const dubKing = useHomeDubKingQuery();

  if (dubKing.isLoading) {
    return (
      <div className="flex justify-center items-center my-16">
        <ScaleLoader color="#FF6D60" />
      </div>
    );
  }

  if (dubKing.isError) {
    return <ErrorComponent onClick={() => dubKing.refetch} retry={true} />;
  }

  return (
    <section className="mx-16 flex justify-around">
      <DubKingItem
        nickname={dubKing.data[1].nickname}
        ranking={dubKing.data[1].ranking}
        dubKingImageUrl={dubKing.data[1].dubKingImageUrl}
        totalCount={dubKing.data[1].totalCount}
      />
      <DubKingItem
        nickname={dubKing.data[0].nickname}
        ranking={dubKing.data[0].ranking}
        dubKingImageUrl={dubKing.data[0].dubKingImageUrl}
        totalCount={dubKing.data[0].totalCount}
      />
      <DubKingItem
        nickname={dubKing.data[2].nickname}
        ranking={dubKing.data[2].ranking}
        dubKingImageUrl={dubKing.data[2].dubKingImageUrl}
        totalCount={dubKing.data[2].totalCount}
      />
    </section>
  );
}
