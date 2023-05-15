import useScrapDubVideoListQuery from "@/apis/mypage/queries/useScrapDubListQuery";
import ErrorComponent from "@/components/atoms/ErrorComponent";
import DubVideoListItem from "@/components/molecules/DubVideoListItem";
import { LangType } from "@/enum/statusType";
import Link from "next/link";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

export default function SaveContentsListPage() {
  const [myPageLangIndex, setMyPageLangIndex] = useState(LangType.ENGLISH);

  const { data, isLoading, isError, refetch } =
    useScrapDubVideoListQuery(false);

  function handleMyPageLangIndex(presentIndex: LangType) {
    console.log("presentIndex", presentIndex);
    console.log("handle 실행됨", myPageLangIndex);
    setMyPageLangIndex(presentIndex);
  }

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

  return (
    <div className="static h-full px-16 bg-white mt-57 mb-61">
      {/* <LanguageTap
    myPageLangIndex={myPageLangIndex}
    handleMyPageLangIndex={handleMyPageLangIndex}
  /> */}
      {data &&
        data.map((item: any) => (
          <Link href={`/community/shorts/video/${item.id}`}>
            <DubVideoListItem
              key={item.id}
              id={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
            />
          </Link>
        ))}
    </div>
  );
}
