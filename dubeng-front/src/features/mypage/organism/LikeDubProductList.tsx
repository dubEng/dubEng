import { Swiper, SwiperSlide } from "swiper/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from "../../../components/atoms/ErrorComponent";
import "swiper/css";
import Link from "next/link";
import DubProductCard from "../molecules/DubProductCard";
import useLikeDubProductListQuery from "@/apis/mypage/queries/useLikeDubProductListQuery";
import axios from 'axios';
import EmptyComponent from "@/components/atoms/EmptyComponent";
import { EmptyType } from "@/enum/statusType";

export default function LikeDubProductList() {
  const {data, isLoading, refetch, error} = useLikeDubProductListQuery(true);

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
    <Swiper slidesPerView={1.25}>
      {data &&
        data.map((item: any) => (
          <SwiperSlide key={item.id}>
            <Link href={`/community/shorts/product/${item.id}`}>
              <DubProductCard
                title={item.title}
                thumbnail={item.thumbnail ?? ""}
                playCount={item.playCount}
              />
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
