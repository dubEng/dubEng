import useLikeDubProductListQuery from "@/apis/mypage/queries/useLikeDubProductListQuery";
import EmptyComponent from "@/components/atoms/EmptyComponent";
import ErrorComponent from "@/components/atoms/ErrorComponent";
import DubProductListItem from "@/components/molecules/DubProductListItem";
import { EmptyType, LangType } from "@/enum/statusType";
import LanguageTap from "@/features/mypage/atoms/LanguageTap";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

export default function LikeDubbingListPage() {
  const { data, isLoading, error, refetch } =
    useLikeDubProductListQuery(false);

  const [myPageLangIndex, setMyPageLangIndex] = useState(LangType.ENGLISH);

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

  if (error) {
    if (axios.isAxiosError(error)) {
      if(error.response?.status === 404){
        return <EmptyComponent status={EmptyType.EMPTY_LIKE_DUB_PRODUCT} />
      }
    } else {
      return <ErrorComponent onClick={() => refetch} retry={true} />;
    }
  }

  return (
    <div className="static h-full px-16 bg-white mt-57 mb-61">
      {/* <LanguageTap
        myPageLangIndex={myPageLangIndex}
        handleMyPageLangIndex={handleMyPageLangIndex}
      /> */}
      {data &&
        data.map((item: any) => (
          <Link href={`/community/shorts/product/${item.id}`}>
            <DubProductListItem
              title={item.title}
              thumbnail={item.thumbnail}
              playCount={item.playCount}
              recordId={item.id}
              key={item.id}
              createdDate={item.updatedDate}
              runtime={item.runtime}
              profileImage={item.profileImage}
              nickname={item.nickname}
            />
          </Link>
        ))}
    </div>
  );
}
