import DubVideoThumbnail from "../../../components/atoms/DubVideoThumbnail";

import { DubProduct } from "@/types/DubProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function DubProductList() {
  const dubProductList: DubProduct[] = [
    { videoId: 0, title: "New Year, New Bears | We Bare Bears", url: "0" },
    { videoId: 1, title: "겨울 왕국", url: "1" },
    { videoId: 2, title: "라이언킹", url: "2" },
    { videoId: 3, title: "워킹데드", url: "3" },
    { videoId: 4, title: "해리포터", url: "4" },
    { videoId: 5, title: "아따맘마", url: "5" },
  ];

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
      {dubProductList &&
        dubProductList.map((item, index) => (
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
