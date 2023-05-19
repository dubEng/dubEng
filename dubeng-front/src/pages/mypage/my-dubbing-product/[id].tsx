import { EmptyType, LangType } from "@/enum/statusType";
import LanguageTap from "@/features/mypage/atoms/LanguageTap";
import { useEffect, useState } from "react";
import useMyDubProductListMutation from "@/apis/mypage/mutations/useMyDubProductListMutationts";
import { ScaleLoader } from "react-spinners";
import ErrorComponent from "@/components/atoms/ErrorComponent";
import Link from "next/link";
import DubProductListItem from "@/components/molecules/DubProductListItem";
import EmptyComponent from "@/components/atoms/EmptyComponent";
import axios from "axios";
import { useRouter } from "next/router";

export default function DifferentUserProductPage() {
  const router = useRouter();
  const [differentUserPageLangIndex, setDifferentUserPageLangIndex] = useState(
    LangType.ENGLISH
  );

  const userId = String(router.query.id);

  const { mutateAsync, isLoading, error } = useMyDubProductListMutation();

  const [differentUserProductList, setDifferentUserProductList] =
    useState<any>(null);

  useEffect(() => {
    if (userId) {
      async function getMyDubProductList() {
        const payload = {
          userId: userId,
          isPublic: true,
          isLimit: false,
          lanType: differentUserPageLangIndex,
        };

        const { data } = await mutateAsync(payload);
        setDifferentUserProductList(data);
      }

      getMyDubProductList();
    }
  }, [differentUserPageLangIndex]);

  useEffect(() => {
    if (userId) {
      async function getMyDubProductList() {
        const payload = {
          userId: userId,
          isPublic: true,
          isLimit: false,
          lanType: differentUserPageLangIndex,
        };

        const { data } = await mutateAsync(payload);
        setDifferentUserProductList(data);
      }

      getMyDubProductList();
    }
  }, [userId]);

  function handleMyPageLangIndex(presentIndex: LangType) {
    setDifferentUserPageLangIndex(presentIndex);
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
            <EmptyComponent status={EmptyType.EMPTY_DUB_PRODUCT} />
          </div>
        );
      }
    } else {
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
        myPageLangIndex={differentUserPageLangIndex}
        handleMyPageLangIndex={handleMyPageLangIndex}
      />
      {differentUserProductList &&
        differentUserProductList.map((item: any) => (
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
      <div className="h-80"></div>
    </div>
  );
}
