import UserRankingList from "@/features/home/organism/UserRankingList";
import DubKingList from "@/features/home/organism/DubKingList";
import DubProductList from "@/features/home/organism/DubProductList";
import HomeBannerList from "@/features/home/organism/HomeBannerList";

export default function HomePage() {
  return (
    <div className="h-screen bg-white mt-57 mb-61 pt-8">
      <div className="m-16">
        <HomeBannerList />
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
      <div className="h-60"></div>
    </div>
  );
}
