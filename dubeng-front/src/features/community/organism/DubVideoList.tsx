import DubVideoThumbnail from "../../../components/atoms/DubVideoThumbnail";

import { Swiper, SwiperSlide } from "swiper/react";
import useRecommendDubVideoListQuery from "../../../apis/community/queries/useRecommendDubVideoListQuery";
// import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from "../../../components/atoms/ErrorComponent";
import "swiper/css";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import UserProfile from "@/components/atoms/UserProfile";

export default function DubProductList() {
  const languageIndex = useSelector((state: RootState) => {
    return state.languageTab.langType;
  });
  const recommendList = useRecommendDubVideoListQuery(languageIndex);

  if (recommendList.isLoading) {
    return (
      <div className="flex justify-center items-center my-16">
        {/* <ScaleLoader color="#FF6D60" /> */}
        {"로딩 중입니다"}
      </div>
    );
  }

  if (recommendList.isError) {
    return (
      <ErrorComponent onClick={() => recommendList.refetch} retry={true} />
    );
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
      {recommendList.data &&
        recommendList.data.map((item: any, index: number) => (
          <SwiperSlide key={item.videoId}>
            <DubVideoThumbnail
              title={item.title}
              url={item.url}
              videoId={item.videoId}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
