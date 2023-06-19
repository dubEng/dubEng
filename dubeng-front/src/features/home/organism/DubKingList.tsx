import ScaleLoader from "react-spinners/ScaleLoader";
import DubKingItem from "../molecules/DubKingItem";
import useHomeDubKingQuery from "../../../apis/home/queries/useHomeDubKingQuery";
import ErrorComponent from "../../../components/atoms/ErrorComponent";

import DefaultImage from "../../../../public/images/default/mic_profile.png";

// import ProfileOne from "../../../../public/images/dump/profile_01.svg";
// import ProfileTwo from "../../../../public/images/dump/profile_02.svg";
// import ProfileThree from "../../../../public/images/dump/profile_03.svg";
import { DubKing } from "@/types/DubKing";
import { getHomeDubKing } from "@/apis/home/api/home";

export default function DubKingList(props : any) {

  const { data, isLoading, isError, refetch } = useHomeDubKingQuery(props.homeDubKing);

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


export async function getStaticProps() {
  const homeDubKing = await getHomeDubKing();
  
  return {
    props: { homeDubKing },
    revalidate: 60,
  };
}
