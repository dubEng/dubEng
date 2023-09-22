import { Swiper, SwiperSlide } from "swiper/react";
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from "../../../components/atoms/ErrorComponent";
import "swiper/css";
import Link from "next/link";
import DubProductCard from "../molecules/DubProductCard";
import useLikeDubProductListQuery from "@/apis/mypage/queries/useLikeDubProductListQuery";
import axios from "axios";
import EmptyComponent from "@/components/atoms/EmptyComponent";
import { EmptyType } from "@/enum/statusType";

export default function LikeDubProductList() {
  const { data, isLoading, refetch, error } = useLikeDubProductListQuery(
    true,
    "all"
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-16">
        <ScaleLoader color="#FF6D60" />
      </div>
    );
  }

  if (error) {
    return <ErrorComponent onClick={() => refetch} retry={true} />;
  }

  if (data.length == 0) {
    return <EmptyComponent status={EmptyType.EMPTY_LIKE_DUB_PRODUCT} />;
  } else {
    return (
      <Swiper spaceBetween={24} slidesPerView={1.35}>
        {data &&
          data.map((item: any) => (
            <SwiperSlide key={item.id}>
              <Link href={`/community/shorts/product/${item.id}`}>
                <DubProductCard
                  title={item.title}
                  thumbnail={item.thumbnail ?? ""}
                  playCount={item.playCount}
                  updatedDate={item.updatedDate}
                  nickname={item.nickname}
                  userProfileImg={item.userProfileImg}
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    );
  }
}
