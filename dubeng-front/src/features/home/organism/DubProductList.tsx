import DubVideoThumbnail from "../../../components/atoms/DubVideoThumbnail";

import { Swiper, SwiperSlide } from "swiper/react";
import useHomePopularityQuery from "../../../apis/home/queries/useHomePopularityQuery";
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from "../../../components/atoms/ErrorComponent";
import "swiper/css";
import Link from "next/link";

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
    <Swiper>
      {popularity.data &&
        popularity.data.map((item: any, index: number) => (
          <SwiperSlide key={item.id}>
            <Link href={`/community/shorts/product/${item.recordId}`}>
              <DubVideoThumbnail
                title={item.title}
                thumbnail={item.thumbnail ?? ""}
                id={item.id}
              />
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
