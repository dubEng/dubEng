import { LangType } from "@/enum/statusType";
import LanguageTap from "@/features/mypage/atoms/LanguageTap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import useMyDubProductListMutation from "@/apis/mypage/mutations/useMyDubProductListMutationts";
import { ScaleLoader } from "react-spinners";
import ErrorComponent from "@/components/atoms/ErrorComponent";
import Link from "next/link";
import DubProductListItem from "@/components/molecules/DubProductListItem";

export default function myDubbingProductPage() {
  const [myPageLangIndex, setMyPageLangIndex] = useState(LangType.ENGLISH);

  const userId = useSelector((state: RootState) => state.user.userId);

  const { mutateAsync, isLoading, isError } = useMyDubProductListMutation();

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
    console.log('presentIndex', presentIndex);
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
    return <ErrorComponent onClick={() => {}} retry={false} />;
  }

  return (
    <div className="static h-full px-16 bg-white mt-57 mb-61">
      <LanguageTap
        myPageLangIndex={myPageLangIndex}
        handleMyPageLangIndex={handleMyPageLangIndex}
      />
      {myProductList &&
        myProductList.map((item: any) => (
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
