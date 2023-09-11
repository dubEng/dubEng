"use client";
import { MdHomeFilled } from "react-icons/md";
import { MdHeadphones } from "react-icons/md";
import { ImBook } from "react-icons/im";
import { AiOutlineSmile } from "react-icons/ai";
import { MdPlayCircleOutline } from "react-icons/md";

import { usePathname } from "next/navigation";
import RecordingButton from "./RecordingButton";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useEffect, useState } from "react";
import useCommunityShortsQuery from "@/apis/community/queries/useCommunityShortsQuery";
import { setRecordIdListClear } from "@/stores/community/shortsSlice";

const MySwal = withReactContent(Swal);

const menu = [
  {
    href: "/",
    label: "홈",
    icon: <MdHomeFilled size={24} color="#767676" />,
    clickedIcon: <MdHomeFilled size={24} color="#ff6d60" />,
  },
  {
    href: "/shorts",
    label: "Shorts",
    icon: <MdPlayCircleOutline size={24} color="#767676" />,
    clickedIcon: <MdPlayCircleOutline size={24} color="#ff6d60" />,
  },
  {
    href: "/community",
    label: "녹음버튼",
  },
  {
    href: "/mission",
    label: "도전과제",
    icon: <ImBook size={24} color="#767676" />,
    clickedIcon: <ImBook size={24} color="#ff6d60" />,
  },
  {
    href: "/mypage",
    label: "My",
    icon: <AiOutlineSmile size={24} color="#767676" />,
    clickedIcon: <AiOutlineSmile size={24} color="#ff6d60" />,
  },
];

export default function NavigationBar() {
  const pathName = usePathname();
  const route = useRouter();

  const userId = useSelector((state: RootState) => state.user.userId);
  const dispatch = useDispatch();

  const { data: contentList, refetch } = useCommunityShortsQuery();

  // const [firstRecordId, setFirstRecordId] = useState();

  // useEffect(() => {
  //   if (contentList) {
  //     console.log("contentList 테스트", contentList);
  //     setFirstRecordId(contentList[0].recordId);
  //   }
  // }, [contentList]);

  // 관리자 페이지에서는 NavBar안보여줌

  if (pathName === "/manager") {
    return <></>;
  } else if (pathName === "/login") {
    return <></>;
  } else {
    return (
      <nav className={getNavigationBarStyle(pathName)}>
        <ul className="flex justify-around">
          {menu.map((item) => (
            <li key={item.href}>
              {item.href === "/community" ? (
                <button
                  className="flex flex-col justify-center items-center"
                  onClick={() => handleNavigationButton(item.href)}
                >
                  <RecordingButton page={pathName} />
                </button>
              ) : (
                <button
                  className="flex flex-col justify-center items-center pt-4"
                  onClick={() => handleNavigationButton(item.href)}
                >
                  {pathName === item.href ? item.clickedIcon : item.icon}
                  {pathName === item.href ? (
                    <p className="text-dubcoral text-12">{item.label}</p>
                  ) : (
                    <p className="text-dubgray text-12">{item.label}</p>
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  async function handleNavigationButton(pathName: string) {
    if (pathName === "/mypage") {
      if (userId.length == 0) {
        await MySwal.fire("로그인 후 이용 가능합니다.");
        route.push("/login");
      } else {
        route.push(pathName);
      }
    } else if (pathName === "/mission") {
      if (userId.length == 0) {
        await MySwal.fire("로그인 후 이용 가능합니다.");
        route.push("/login");
      } else {
        route.push(pathName);
      }
    } else if (pathName === "/shorts") {
      const firstContent = await refetch();
      if (firstContent) {
        dispatch(setRecordIdListClear());
        route.push(`/shorts/${firstContent.data[0].recordId}?index=0`);
      }
    } else {
      route.push(pathName);
    }
  }

  function getNavigationBarStyle(pathName: string): string {
    if (pathName?.includes("shorts")) {
      // border-t-1 border-[#DEE2E6]
      return "h-61 pt-8 pb-8 fixed w-full bottom-0 z-50 bg-dubblack ";
    } else {
      return "h-61 pt-8 pb-8 fixed w-full bottom-0 z-50 bg-white border-t-1 border-[#DEE2E6]";
    }
  }
}
