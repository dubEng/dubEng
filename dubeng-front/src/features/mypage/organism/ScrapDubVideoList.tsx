import DubVideoThumbnail from "../../../components/atoms/DubVideoThumbnail";

import { Swiper, SwiperSlide } from "swiper/react";
import ErrorComponent from "../../../components/atoms/ErrorComponent";
import "swiper/css";

import Link from "next/link";
import { ScaleLoader } from "react-spinners";
import useScrapDubVideoListQuery from "@/apis/mypage/queries/useScrapDubListQuery";

export default function ScrapDubVideoList() {
  const { data, isLoading, isError, refetch } = useScrapDubVideoListQuery(true);

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
    <Swiper
      slidesPerView={1.4}
      spaceBetween={16}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data &&
        data.map((item: any) => (
          <SwiperSlide key={item.id}>
            <Link href={`/community/shorts/video/${item.id}`}>
              <DubVideoThumbnail
                id={item.id}
                title={item.title}
                thumbnail={item.thumbnail}
              />
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
