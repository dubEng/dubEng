import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper";

import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function HomeBannerList() {
  return (
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
          <button className="mt-16">
            <Image
              width={358}
              height={65}
              src={"/images/home/banner_review.png"}
              alt={"banner"}
              className="rounded-6 h-auto"
            />
          </button>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href="https://instagram.com/dub.eng?igshid=NTc4MTIwNjQ2YQ==">
          <button className="mt-16">
            <Image
              width={358}
              height={65}
              src={"/images/home/banner_instagram.png"}
              alt={"banner"}
              className="rounded-6"
            />
          </button>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <button className="mt-16">
          <Image
            width={358}
            height={65}
            src={"/images/home/banner2.png"}
            alt={"banner"}
            className="rounded-6"
          />
        </button>
      </SwiperSlide>
    </Swiper>
  );
}
