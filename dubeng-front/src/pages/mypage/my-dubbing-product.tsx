import { EmptyType, LangType } from "@/enum/statusType";
import LanguageTap from "@/features/mypage/atoms/LanguageTap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import useMyDubProductListMutation from "@/apis/mypage/mutations/useMyDubProductListMutationts";
import { ScaleLoader } from "react-spinners";
import ErrorComponent from "@/components/atoms/ErrorComponent";
import Link from "next/link";
import DubProductListItem from "@/components/molecules/DubProductListItem";
import EmptyComponent from "@/components/atoms/EmptyComponent";
import axios from "axios";

export default function myDubbingProductPage() {
  const [myPageLangIndex, setMyPageLangIndex] = useState(LangType.ENGLISH);

  const userId = useSelector((state: RootState) => state.user.userId);

  const { mutateAsync, isLoading, error } = useMyDubProductListMutation();

  const [myProductList, setMyProductList] = useState<any>(null);

  useEffect(() => {
    if (userId) {
      async function getMyDubProductList() {
        const payload = {
          userId: userId,
          isPublic: false,
          isLimit: false,
          lanType: myPageLangIndex,
        };

        const { data } = await mutateAsync(payload);
        setMyProductList(data);
      }

      getMyDubProductList();
    }
  }, [myPageLangIndex]);

  useEffect(() => {
    if (userId) {
      async function getMyDubProductList() {
        const payload = {
          userId: userId,
          isPublic: false,
          isLimit: false,
          lanType: myPageLangIndex,
        };

        const { data } = await mutateAsync(payload);
        setMyProductList(data);
      }

      getMyDubProductList();
    }
  }, [userId]);

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
      return (
        <div className="mt-80">
          <ErrorComponent onClick={() => {}} retry={false} />;
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
      {myProductList && myProductList.length > 0 ? (
        myProductList.map((item: any) => (
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
          <EmptyComponent status={EmptyType.EMPTY_DUB_PRODUCT} />
        </div>
      )}
      <div className="h-60"></div>
    </div>
  );
}
