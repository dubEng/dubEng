import { Swiper, SwiperSlide } from "swiper/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from "../../../components/atoms/ErrorComponent";
import "swiper/css";
import Link from "next/link";
import DubProductCard from "../molecules/DubProductCard";
import useLikeDubProductListQuery from "@/apis/mypage/queries/useLikeDubProductListQuery";

export default function LikeDubProductList() {
  const {data, isLoading, isError, refetch} = useLikeDubProductListQuery(true);

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
