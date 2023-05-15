import { Swiper, SwiperSlide } from "swiper/react";
import useHomePopularityQuery from "../../../apis/home/queries/useHomePopularityQuery";
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from "../../../components/atoms/ErrorComponent";
import "swiper/css";
import Link from "next/link";
import DubProductCard from "../molecules/DubProductCard";
// import useMyDubProductListQuery from "@/apis/mypage/mutations/useMyDubProductListQuery";
import { LangType } from "@/enum/statusType";
import useLikeDubProductListQuery from "@/apis/mypage/queries/useLikeDubProductListQuery";

export default function LikeDubProductList() {
  const likeProductList = useLikeDubProductListQuery(true);

  // if (popularity.isLoading) {
  //   return (
  //     <div className="flex justify-center items-center my-16">
  //       <ScaleLoader color="#FF6D60" />
  //     </div>
  //   );
  // }

  // if (popularity.isError) {
  //   return <ErrorComponent onClick={() => popularity.refetch} retry={true} />;
  // }

  return (
    // <Swiper slidesPerView={1.25}>
    //   {popularity.data &&
    //     popularity.data.map((item: any, index: number) => (
    //       <SwiperSlide key={item.recordId}>
    //         <Link href={`/community/shorts/product/${item.recordId}`}>
    //           <DubProductCard
    //             title={item.title}
    //             thumbnail={item.thumbnail ?? ""}
    //             id={item.recordId}
    //           />
    //         </Link>
    //       </SwiperSlide>
    //     ))}
    // </Swiper>
    <></>
  );
}
