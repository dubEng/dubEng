import useProfileMutation from "@/apis/mypage/mutations/useProfileMutation";
import TagButton from "@/components/atoms/TagButton";
import DifferentUserDubProductList from "@/features/mypage/organism/DifferentUserDubProductList";
import MyDubProductList from "@/features/mypage/organism/MyDubProductList";
import MyPageProfile from "@/features/mypage/organism/MyPageProfile";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdArrowForwardIos } from "react-icons/md";

export default function DifferentUserPage() {
  const router = useRouter();
  const { data: differentProfileData, mutate } = useProfileMutation();
  useEffect(() => {
    mutate({ userId: String(router.query.id) });
  }, []);
  return (
    <div className="static h-full px-16 bg-white mt-57 mb-61">
      <MyPageProfile
        nickname={differentProfileData?.data.nickname}
        description={differentProfileData?.data.description}
        profileImage={differentProfileData?.data.profileImage}
        totalRecTime={differentProfileData?.data.totalRecTime}
        recordCount={differentProfileData?.data.recordCount}
      />

      <div className="mt-24 h-10 bg-[#F5F5F5]"></div>

      <p className="flex justify-start text-19 font-bold mt-24 mb-16">
        선호 장르
      </p>
      <div className="flex flex-wrap">
        {differentProfileData?.data.category &&
          differentProfileData?.data.category.map(
            (tag: { categoryName: string }, idx: number) => (
              <TagButton
                onClick={() => {}}
                id={0}
                key={idx}
                name={tag.categoryName}
                isSelected={true}
              />
            )
          )}
      </div>
      <div className="flex items-center justify-between">
        <p className="flex justify-start text-19 font-bold mt-24 mb-16">
          {differentProfileData?.data.nickname}님의 상영관
        </p>
        <Link href={`/mypage/my-dubbing-product/${String(router.query.id)}`}>
          <button className="mt-24 mb-16 flex justify-center items-center">
            <p className="text-dubblack text-14 ">모두보기</p>
            <MdArrowForwardIos
              width={16}
              height={16}
              className="text-dubgray"
            />
          </button>
        </Link>
      </div>
      <DifferentUserDubProductList userId={String(router.query.id)} />
      <div className="h-60"></div>
    </div>
    // <div className="static h-full px-16 bg-white mt-57 mb-61">
    //   <MyPageProfile
    //     nickname={differentProfileData?.nickname}
    //     description={differentProfileData?.description}
    //     profileImage={differentProfileData?.profileImage}
    //     totalRecTime={differentProfileData?.totalRecTime}
    //     recordCount={differentProfileData?.recordCount}
    //   />

    //   <div className="mt-24 h-10 bg-[#F5F5F5]"></div>

    //   <p className="flex justify-start text-19 font-bold mt-24 mb-16">
    //     선호 장르
    //   </p>
    //   <div className="flex flex-wrap">
    //     {categoryList &&
    //       categoryList.map((tag: { categoryName: string }, idx: number) => (
    //         <TagButton
    //           onClick={() => {}}
    //           id={0}
    //           key={idx}
    //           name={tag.categoryName}
    //           isSelected={true}
    //         />
    //       ))}
    //   </div>
    //   <p className="flex justify-start text-19 font-bold mt-24 mb-16">
    //     이 달의 출석
    //   </p>
    //   <div className="m-20 drop-shadow-lg">
    //     <MyCalendar />
    //   </div>
    //   <div className="h-10 bg-[#F5F5F5]"></div>

    //   <div className="flex items-center justify-between">
    //     <p className="flex justify-start text-19 font-bold mt-24 mb-16">
    //       나의 더빙목록
    //     </p>
    //     <Link href={`/mypage/my-dubbing-product`}>
    //       <button className="mt-24 mb-16 flex justify-center items-center">
    //         <p className="text-dubblack text-14 ">모두보기</p>
    //         <MdArrowForwardIos
    //           width={16}
    //           height={16}
    //           className="text-dubgray"
    //         />
    //       </button>
    //     </Link>
    //   </div>
    //   <MyDubProductList />
    //   <div className="flex items-center justify-between">
    //     <p className="flex justify-start text-19 font-bold mt-24 mb-16">
    //       좋아요한 더빙 목록
    //     </p>
    //     <Link href={`/mypage/like-dubbing-list`}>
    //       <button className="mt-24 mb-16 flex justify-center items-center">
    //         <p className="text-dubblack text-14 ">모두보기</p>
    //         <MdArrowForwardIos
    //           width={16}
    //           height={16}
    //           className="text-dubgray"
    //         />
    //       </button>
    //     </Link>
    //   </div>
    //   <LikeDubProductList />
    //   <div className="flex items-center justify-between">
    //     <p className="flex justify-start text-19 font-bold mt-24 mb-16">
    //       저장한 콘텐츠 목록
    //     </p>
    //     <Link href={`/mypage/save-contents-list`}>
    //       <button className="mt-24 mb-16 flex justify-center items-center">
    //         <p className="text-dubblack text-14 ">모두보기</p>
    //         <MdArrowForwardIos
    //           width={16}
    //           height={16}
    //           className="text-dubgray"
    //         />
    //       </button>
    //     </Link>
    //   </div>
    //   <ScrapDubVideoList />
    //   <div
    //     className="flex items-center justify-between"
    //     onClick={handleLogOutButton}
    //   >
    //     <button className="flex justify-start text-19 font-bold mt-24 mb-16">
    //       로그아웃
    //     </button>
    //     <button className="mt-24 mb-16 flex justify-center items-center">
    //       <MdArrowForwardIos width={16} height={16} className="text-dubgray" />
    //     </button>
    //   </div>

    //   <div className="h-80"></div>
    // </div>
  );
}
