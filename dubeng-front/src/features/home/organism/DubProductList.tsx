import DubVideoThumbnail from "../../../components/atoms/DubVideoThumbnail";

import { Swiper, SwiperSlide } from "swiper/react";
import useHomePopularityQuery from "../../../apis/home/queries/useHomePopularityQuery";
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from "../../../components/atoms/ErrorComponent";
import "swiper/css";

export default function DubProductList() {
  const popularity = useHomePopularityQuery();

  if (popularity.isLoading) {
    return (
      <div className="flex justify-center items-center my-16">
        <ScaleLoader color="#FF6D60" />
      </div>
    );
  }

  if (popularity.isError) {
    return <ErrorComponent onClick={() => popularity.refetch} retry={true} />;
  }

  return (
    <Swiper
      slidesPerView={1.4}
      spaceBetween={16}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      breakpoints={{
        655: {
          slidesPerView: 1.4,
          spaceBetween: 16,
        },
        1000: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        1300: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        1650: {
          slidesPerView: 4,
          spaceBetween: 16,
        },
        3000: {
          slidesPerView: 5,
          spaceBetween: 16,
        },
      }}
    >
      {popularity.data &&
        popularity.data.map((item: any, index: number) => (
          <SwiperSlide key={item.videoId}>
            <DubVideoThumbnail
              title={item.title}
              thumbnail={item.thumbnail}
              id={item.videoId}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
