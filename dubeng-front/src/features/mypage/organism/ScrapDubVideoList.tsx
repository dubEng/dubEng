import DubVideoThumbnail from "../../../components/atoms/DubVideoThumbnail";

import { Swiper, SwiperSlide } from "swiper/react";
import ErrorComponent from "../../../components/atoms/ErrorComponent";
import "swiper/css";

import Link from "next/link";
import { ScaleLoader } from "react-spinners";
import useScrapDubVideoListQuery from "@/apis/mypage/queries/useScrapDubListQuery";
import axios from 'axios';
import EmptyComponent from "@/components/atoms/EmptyComponent";
import { EmptyType } from "@/enum/statusType";

export default function ScrapDubVideoList() {
  const { data, isLoading, error, refetch } = useScrapDubVideoListQuery(true, "all");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-16">
        <ScaleLoader color="#FF6D60" />
      </div>
    );
  }

  if (error) {
    if (axios.isAxiosError(error)) {
      if(error.response?.status === 404){
        return <EmptyComponent status={EmptyType.EMPTY_SCRAP_DUB_VIDEO} />
      }
    } else {
      return <ErrorComponent onClick={() => refetch} retry={true} />;
    }
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
