import UserRankingList from "@/features/home/organism/UserRankingList";
import DubKingList from "@/features/home/organism/DubKingList";
import DubProductList from "@/features/home/organism/DubProductList";
import Image from "next/image";

import BannerOne from "../../public/images/home/banner1.png";
import BannerTwo from "../../public/images/home/banner2.png";
import BannerThree from "../../public/images/home/banner3.png";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function HomePage() {
  return (
    <div className="h-screen bg-white mt-57 mb-61">
      <div className="m-16">
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="p-16 ">
              <Image src={BannerOne} alt={"banner"} className="rounded-6" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-16 ">
              <Image src={BannerTwo} alt={"banner"} className="rounded-6" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-16 ">
              <Image src={BannerThree} alt={"banner"} className="rounded-6" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <p className="flex justify-start mx-16 text-19 font-bold mt-24 mb-16">
        실시간 인기 더빙
      </p>
      <div className="ml-16 ">
        <DubProductList />
      </div>
      <p className="flex justify-start mx-16 text-19 font-bold mt-24">
        유저 랭킹
      </p>
      <UserRankingList />
      <p className="flex justify-start mx-16 text-19 font-bold mt-24">
        이주의 더빙왕
      </p>
      <DubKingList />
      <div className="h-80"></div>
    </div>
  );
}
