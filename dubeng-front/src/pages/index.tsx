import UserRankingList from "@/features/home/organism/UserRankingList";
import DubKingList from "@/features/home/organism/DubKingList";
import DubProductList from "@/features/home/organism/DubProductList";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper";

import Link from "next/link";

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
            <Link href="https://forms.gle/iRVTiCJFVAc9bBeH7">
              <button className="p-16 ">
                <img
                  src={"/images/home/banner_review.png"}
                  alt={"banner"}
                  className="rounded-6"
                />
              </button>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="https://instagram.com/dub.eng?igshid=NTc4MTIwNjQ2YQ==">
              <button className="p-16 ">
                <img
                  src={"/images/home/banner_instagram.png"}
                  alt={"banner"}
                  className="rounded-6"
                />
              </button>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <button className="p-16 ">
              <img
                src={"/images/home/banner2.png"}
                alt={"banner"}
                className="rounded-6"
              />
            </button>
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
