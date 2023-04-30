import { UserRanking } from "@/types/UserRanking";
import ProfileOne from "../../../../public/images/dump/profile_01.svg";
import ProfileTwo from "../../../../public/images/dump/profile_02.svg";
import ProfileThree from "../../../../public/images/dump/profile_03.svg";
import ProfileFour from "../../../../public/images/dump/profile_04.svg";
import ProfileFive from "../../../../public/images/dump/profile_05.svg";
import UserRankingListItem from "../molecules/UserRankingListItem";

export default function UserRankingList() {
  const userRankingList: UserRanking[] = [
    {
      ranking: 1,
      imageUrl: ProfileOne,
      nickname: "김자민",
      introduce: "안산 꿀주먹",
      recordingTime: 10,
      dubingCount: 53,
    },
    {
      ranking: 2,
      imageUrl: ProfileTwo,
      nickname: "김동동",
      introduce: "FE, BE, DevOps",
      recordingTime: 10,
      dubingCount: 53,
    },
    {
      ranking: 3,
      imageUrl: ProfileThree,
      nickname: "김언도",
      introduce: "안녕하세요, 언도입니다.",
      recordingTime: 10,
      dubingCount: 53,
    },
    {
      ranking: 4,
      imageUrl: ProfileFour,
      nickname: "김지희",
      introduce: "CA말이 우수워?",
      recordingTime: 10,
      dubingCount: 53,
    },
    {
      ranking: 5,
      imageUrl: ProfileFive,
      nickname: "김아영",
      introduce: "8 Team Leader",
      recordingTime: 10,
      dubingCount: 53,
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-12 mb-16 gap-8">
        <div className="col-span-2"></div>
        <div className="flex justify-end text-13 text-dubblack">닉네임</div>
        <div className="col-span-7"></div>
        <div className="text-13 text-dubblack flex items-center justify-center">녹음시간</div>
        <div className="text-13 text-dubblack flex items-center justify-center">더빙 횟수</div>
      </div>
      {userRankingList &&
        userRankingList.map((item) => (
          <UserRankingListItem
            imageUrl={item.imageUrl}
            introduce={item.introduce}
            nickname={item.nickname}
            ranking={item.ranking}
            dubingCount={item.dubingCount}
            recordingTime={item.recordingTime}
          />
        ))}
    </section>
  );
}
