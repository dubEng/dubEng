import DubVideoThumbnail from "../../../components/atoms/DubVideoThumbnail";

import { Swiper, SwiperSlide } from "swiper/react";
import useRecommendDubVideoListQuery from "../../../apis/community/queries/useRecommendDubVideoListQuery";
// import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from "../../../components/atoms/ErrorComponent";
import "swiper/css";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import UserProfile from "@/components/atoms/UserProfile";
import axios from "axios";
import Link from "next/link";

export default function DubVideoList() {
  const languageIndex = useSelector((state: RootState) => {
    return state.languageTab.langType;
  });

  const { data, isLoading, isError, refetch } =
    useRecommendDubVideoListQuery(languageIndex);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-16">
        {/* <ScaleLoader color="#FF6D60" /> */}
        {"로딩 중입니다"}
      </div>
    );
  }

  if (isError) {
    return <ErrorComponent onClick={() => refetch} retry={true} />;
  }

  return (
    <Swiper spaceBetween={24} slidesPerView={1.5}>
      {data?.data.answer &&
        data?.data.answer.map((item: any, index: number) => (
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
