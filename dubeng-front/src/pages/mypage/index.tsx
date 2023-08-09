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

import useProfileMutation from "@/apis/mypage/mutations/useProfileMutation";
import MyCalendar from "@/features/mypage/atoms/MyCalendar";
import LikeDubProductList from "@/features/mypage/organism/LikeDubProductList";
import ScrapDubVideoList from "@/features/mypage/organism/ScrapDubVideoList";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Head from "next/head";
import useDeleteAccountPost from "@/apis/mypage/mutations/useDeleteAccountPost";

export default function MyPage() {
  const [description, setDescription] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [totalRecTime, setTotalRecTime] = useState<number>(0);
  const [recordCount, setRecordCount] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<any>(null);

  const { mutateAsync } = useProfileMutation();
  const { mutateAsync: mutateDelete } = useDeleteAccountPost();
  const { userId, nickname, accessToken } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (userId) {
      async function getProfile() {
        const payload = {
          userId: userId,
        };

        const { data } = await mutateAsync(payload);
        setDescription(data.description as string);
        setProfileImage(data.profileImage as string);
        setTotalRecTime(data.totalRecTime as number);
        setRecordCount(data.recordCount as number);
        setCategoryList(data.category);
      }

      getProfile();
    }
  }, [userId]);

  //로그아웃
  function handleLogOutButton() {
    MySwal.fire({
      title: "로그아웃 하시겠습니까?",
      icon: "warning",

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "확인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        MySwal.fire({ icon: "success", text: "로그아웃 되었습니다." });
        router.push("/login/logout");
      }
    });
  }

  //회원탈퇴
  function handleDeleteAccountButton() {
    MySwal.fire({
      title: "정말로 탈퇴하시겠습니까?",
      icon: "warning",

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "확인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        mutateDelete(accessToken);
      }
    });
  }

  return (
    <div className="static h-full px-16 bg-white mt-57 mb-61">
      <Head>
        <title>더빙으로 배우는 영어 쉐도잉 서비스 - 마이페이지</title>
        <meta
          name="description"
          content="더빙으로 배우는 영어 쉐도잉 서비스, 마이페이지에서 내가 더빙한 영상, 좋아요 한 영상, 출석 일수를 확인할 수 있습니다."
        />
      </Head>
      <MyPageProfile
        nickname={nickname}
        description={description}
        profileImage={profileImage}
        totalRecTime={totalRecTime}
        recordCount={recordCount}
      />

      <div className="mt-24 h-10 bg-[#F5F5F5]"></div>

      <p className="flex justify-start text-19 font-bold mt-24 mb-16">
        선호 장르
      </p>
      <div className="flex flex-wrap">
        {categoryList &&
          categoryList.map((tag: { categoryName: string }, idx: number) => (
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
        이 달의 출석
      </p>
      <div className="m-20 drop-shadow-lg">
        <MyCalendar />
      </div>
      <div className="h-10 bg-[#F5F5F5]"></div>

      <div className="flex items-center justify-between">
        <p className="flex justify-start text-19 font-bold mt-24 mb-16">
          나의 더빙목록
        </p>
        <Link href={`/mypage/my-dubbing-product`}>
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
      <MyDubProductList />
      <div className="flex items-center justify-between">
        <p className="flex justify-start text-19 font-bold mt-24 mb-16">
          좋아요한 더빙 목록
        </p>
        <Link href={`/mypage/like-dubbing-list`}>
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
      <LikeDubProductList />
      <div className="flex items-center justify-between">
        <p className="flex justify-start text-19 font-bold mt-24 mb-16">
          저장한 콘텐츠 목록
        </p>
        <Link href={`/mypage/save-contents-list`}>
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
      <ScrapDubVideoList />
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleLogOutButton}
      >
        <div className="flex justify-start text-19 font-bold mt-24 mb-16">
          로그아웃
        </div>
        <div className="mt-24 mb-16 flex justify-center items-center">
          <MdArrowForwardIos width={16} height={16} className="text-dubgray" />
        </div>
      </div>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleDeleteAccountButton}
      >
        <div className="flex justify-start text-19 font-bold">회원 탈퇴</div>
        <div className="flex justify-center items-center">
          <MdArrowForwardIos width={16} height={16} className="text-dubgray" />
        </div>
      </div>

      <div className="h-80"></div>
    </div>
  );
}
