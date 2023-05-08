import { Swiper, SwiperSlide } from "swiper/react";
import CategoryButton from "../atoms/CategoryButton";

export default function CategoryList() {
  const categoryList = {
    data: [
      {
        id: 1,
        name: "판타지",
      },
      {
        id: 2,
        name: "로맨스",
      },
      {
        id: 3,
        name: "드라마",
      },
      {
        id: 4,
        name: "애니메이션",
      },
      {
        id: 5,
        name: "SF",
      },
      {
        id: 6,
        name: "기쁨",
      },
      {
        id: 7,
        name: "식당에서",
      },
      {
        id: 8,
        name: "멜로",
      },
      {
        id: 9,
        name: "가족영화",
      },
      {
        id: 10,
        name: "스릴러",
      },
      {
        id: 11,
        name: "미스테리",
      },
      {
        id: 12,
        name: "공포",
      },
    ],
  };

  return (
    <Swiper>
      <SwiperSlide>Slide1</SwiperSlide>
      <SwiperSlide>Slide2</SwiperSlide>
      <SwiperSlide>Slide3</SwiperSlide>
      <SwiperSlide>Slide4</SwiperSlide>
    </Swiper>
  );
}
