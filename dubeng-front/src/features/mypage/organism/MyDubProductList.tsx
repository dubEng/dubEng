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

export default function MyDubProductList() {
  const userId = useSelector((state: RootState) => state.user.userId);

  const { mutateAsync, isLoading, error } = useMyDubProductListMutation();

  const [myProductList, setMyProductList] = useState<any>(null);

  useEffect(() => {
    if (userId) {
      async function getMyDubProductList() {
        const payload = {
          userId: userId,
          isPublic: false,
          isLimit: true,
          lanType: "",
        };

        const { data } = await mutateAsync(payload);
        setMyProductList(data);
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
    return <ErrorComponent onClick={() => {}} retry={false} />;
  }

  if (myProductList && myProductList.length == 0) {
    return <EmptyComponent status={EmptyType.EMPTY_DUB_PRODUCT} />;
  } else {
    return (
      <Swiper slidesPerView={1.25}>
        {myProductList &&
          myProductList.map((item: any) => (
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
    );
  }
}
