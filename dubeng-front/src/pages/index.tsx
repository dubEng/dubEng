import UserRankingList from "@/features/home/organism/UserRankingList";
import DubKingList from "@/features/home/organism/DubKingList";
import Banner from "@/features/home/atoms/Banner";
import DubProductList from "@/features/home/organism/DubProductList";

export default function HomePage() {
  return (
    <div className="h-screen">
      <div className="m-16">
        <Banner />
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
    </div>
  );
}
