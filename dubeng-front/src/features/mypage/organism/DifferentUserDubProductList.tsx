import { Swiper, SwiperSlide } from "swiper/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from "../../../components/atoms/ErrorComponent";
import "swiper/css";
import Link from "next/link";
import DubProductCard from "../molecules/DubProductCard";
import useMyDubProductListMutation from "@/apis/mypage/mutations/useMyDubProductListMutationts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import axios from "axios";
import EmptyComponent from "@/components/atoms/EmptyComponent";
import { EmptyType } from "@/enum/statusType";

interface Iprops {
  userId: string;
}

export default function DifferentUserProductList({ userId }: Iprops) {
  const { mutateAsync, isLoading, error } = useMyDubProductListMutation();

  const [differentUserProductList, setDifferentUserProductList] =
    useState<any>(null);

  useEffect(() => {
    if (userId) {
      async function getMyDubProductList() {
        const payload = {
          userId: userId,
          isPublic: true,
          isLimit: true,
          lanType: "",
        };

        const { data } = await mutateAsync(payload);
        setDifferentUserProductList(data);
      }

      getMyDubProductList();
    }
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-16">
        <ScaleLoader color="#FF6D60" />
      </div>
    );
  }

  if (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return <EmptyComponent status={EmptyType.EMPTY_DUB_PRODUCT} />;
      }
    } else {
      return <ErrorComponent onClick={() => {}} retry={false} />;
    }
  }

  return (
    <>
      <Swiper slidesPerView={1.25}>
        {differentUserProductList &&
          differentUserProductList.map((item: any) => (
            <SwiperSlide key={item.id}>
              <Link href={`/community/shorts/product/${item.id}`}>
                <DubProductCard
                  title={item.title}
                  thumbnail={item.thumbnail ?? ""}
                  playCount={item.playCount}
                  updatedDate={item.updatedDate}
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
