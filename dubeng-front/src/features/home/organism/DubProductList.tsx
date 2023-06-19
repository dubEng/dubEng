import DubVideoThumbnail from "../../../components/atoms/DubVideoThumbnail";

import { Swiper, SwiperSlide } from "swiper/react";
import useHomePopularityQuery from "../../../apis/home/queries/useHomePopularityQuery";
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from "../../../components/atoms/ErrorComponent";
import "swiper/css";
import Link from "next/link";
import { getHomePopularity } from "@/apis/home/api/home";

export default function DubProductList(props : any) {
  const popularity = useHomePopularityQuery(props.popularity);

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
    <Swiper slidesPerView={1.25}>
      {popularity.data &&
        popularity.data.map((item: any, index: number) => (
          <SwiperSlide key={item.recordId}>
            <Link href={`/community/shorts/product/${item.recordId}`}>
              <DubVideoThumbnail
                title={item.title}
                thumbnail={item.thumbnail ?? ""}
                id={item.recordId}
                nickname={item.nickname}
                userProfileImg={item.userProfileImg}
              />
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export async function getStaticProps() {
  const popularity = await getHomePopularity();
  
  return {
    props: { popularity },
    revalidate: 300,
  };
}
