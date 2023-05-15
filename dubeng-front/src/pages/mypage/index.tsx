import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import DubProductCard from "@/features/mypage/molecules/DubProductCard";
import WeBareBears from "../../../public/images/dump/webarebears_image.png";
import { SetStateAction, useEffect, useState } from "react";
import { LangType } from "@/enum/statusType";
import LanguageTap from "@/features/mypage/atoms/LanguageTap";
import MyPageProfile from "@/features/mypage/organism/MyPageProfile";
import TagButton from "@/components/atoms/TagButton";
import { MdArrowForwardIos } from "react-icons/md";
import MyDubProductList from "@/features/mypage/organism/MyDubProductList";
import MyCalendar from "@/features/mypage/atoms/MyCalendar";
import useProfileQuery from "@/apis/mypage/queries/useProfileQuery";

export default function MyPage() {
  const userId = useSelector((state: RootState) => state.user.userId);
  const nickname = useSelector((state: RootState) => state.user.nickname);

  const [description, setDescription] = useState<string>("");

  const { mutateAsync } = useProfileQuery();

  useEffect(() => {
    if (userId) {
      async function getProfile() {
        console.log("getProfile");
        const payload = {
          userId: userId,
        };

        console.log('userId', userId);

        const { data } = await mutateAsync(payload);
        setDescription(data.description as string);
        console.log("response", data);
      }

      getProfile();
    }
  }, [userId]);

  console.log("nickname", nickname);
  
  const interests = [
    {
      categoryName: "판타지",
    },
    {
      categoryName: "애니메이션",
    },
    {
      categoryName: "어하이",
    },
    {
      categoryName: "학교에서",
    },
    {
      categoryName: "회사에서",
    },
    {
      categoryName: "오우",
    },
  ];



  return (
    <div className="static h-full px-16 bg-white mt-57 mb-61">
      유저 아이디: {userId}
      <MyPageProfile
        nickname={nickname}
        description={description}
        profileImage={""}
        totalRecTime={20}
        recordCount={10}
      />

      <div className="mt-24 h-10 bg-[#F5F5F5]"></div>

      <p className="flex justify-start text-19 font-bold mt-24 mb-16">
        선호 장르
      </p>
      <div className="flex flex-wrap">
        {interests.map((tag: { categoryName: string }, idx: number) => (
          <TagButton
            onClick={() => {}}
            id={0}
            key={idx}
            name={tag.categoryName}
            isSelected={true}
          />
        ))}
      </div>
      <p className="flex justify-start text-19 font-bold mt-24 mb-16">
        이달의 캘린더
      </p>
      <div className="m-20 drop-shadow-lg">
        <MyCalendar />
      </div>
      <div className="h-10 bg-[#F5F5F5]"></div>

      <div className="flex items-center justify-between">
        <p className="flex justify-start text-19 font-bold mt-24 mb-16">
          나의 상영관
        </p>
        <button className="mt-24 mb-16 flex justify-center items-center">
          <p className="text-dubblack text-14 ">모두보기</p>
          <MdArrowForwardIos width={16} height={16} className="text-dubgray" />
        </button>
      </div>
      <MyDubProductList />
      <div className="flex items-center justify-between">
        <p className="flex justify-start text-19 font-bold mt-24 mb-16">
          좋아요한 더빙 목록
        </p>
        <button className="mt-24 mb-16 flex justify-center items-center">
          <p className="text-dubblack text-14 ">모두보기</p>
          <MdArrowForwardIos width={16} height={16} className="text-dubgray" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <p className="flex justify-start text-19 font-bold mt-24 mb-16">
          저장한 콘텐츠 목록
        </p>
        <button className="mt-24 mb-16 flex justify-center items-center">
          <p className="text-dubblack text-14 ">모두보기</p>
          <MdArrowForwardIos width={16} height={16} className="text-dubgray" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <p className="flex justify-start text-19 font-bold mt-24 mb-16">
          로그아웃
        </p>
        <button className="mt-24 mb-16 flex justify-center items-center">
          <MdArrowForwardIos width={16} height={16} className="text-dubgray" />
        </button>
      </div>
      <DubProductCard
        title={"안녕안녕안녕"}
        thumbnail={""}
        playCount={11}
        updatedDate={""}
      />
    </div>
  );
}
