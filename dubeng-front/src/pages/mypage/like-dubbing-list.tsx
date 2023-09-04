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
  const [myPageLangIndex, setMyPageLangIndex] = useState(LangType.ENGLISH);

  const { data, isLoading, error, refetch } = useLikeDubProductListQuery(
    false,
    myPageLangIndex
  );

  function handleMyPageLangIndex(presentIndex: LangType) {
    setMyPageLangIndex(presentIndex);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-16 mt-80">
        <ScaleLoader color="#FF6D60" />
      </div>
    );
  }

  if (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return (
          <div className="mt-80">
            <EmptyComponent status={EmptyType.EMPTY_LIKE_DUB_PRODUCT} />
          </div>
        );
      }
    } else {
      return (
        <div className="mt-80">
          <ErrorComponent onClick={() => refetch} retry={true} />;
        </div>
      );
    }
  }

  return (
    <div className="static h-full px-16 bg-white mt-57 mb-61">
      <LanguageTap
        myPageLangIndex={myPageLangIndex}
        handleMyPageLangIndex={handleMyPageLangIndex}
      />
      {data && data.length > 0 ? (
        data.map((item: any) => (
          <Link href={`/community/shorts/product/${item.id}`}>
            <DubProductListItem
              title={item.title}
              thumbnail={item.thumbnail}
              playCount={item.playCount}
              recordId={item.id}
              key={item.id}
              updatedDate={item.updatedDate}
              runtime={item.runtime}
              profileImage={item.profileImage}
              nickname={item.nickname}
            />
          </Link>
        ))
      ) : (
        <div className="mt-80">
          <EmptyComponent status={EmptyType.EMPTY_LIKE_DUB_PRODUCT} />
        </div>
      )}
      <div className="h-60"></div>
    </div>
  );
}
