"use client";
import { MdHomeFilled } from "react-icons/md";
import { MdHeadphones } from "react-icons/md";
import { ImBook } from "react-icons/im";
import { AiOutlineSmile } from "react-icons/ai";

import { usePathname } from "next/navigation";
import RecordingButton from "./RecordingButton";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

const MySwal = withReactContent(Swal);

const menu = [
  {
    href: "/",
    label: "홈",
    icon: <MdHomeFilled size={24} color="#767676" />,
    clickedIcon: <MdHomeFilled size={24} color="#ff6d60" />,
    isNavigatedButton: true,
  },
  {
    href: "/community",
    label: "더빙목록",
    icon: <MdHeadphones size={24} color="#767676" />,
    clickedIcon: <MdHeadphones size={24} color="#ff6d60" />,
    isNavigatedButton: true,
  },
  {
    href: "/others",
    label: "녹음버튼",
    isNavigatedButton: false,
  },
  {
    href: "/mission",
    label: "도전과제",
    icon: <ImBook size={24} color="#767676" />,
    clickedIcon: <ImBook size={24} color="#ff6d60" />,
    isNavigatedButton: true,
  },
  {
    href: "/mypage",
    label: "My",
    icon: <AiOutlineSmile size={24} color="#767676" />,
    clickedIcon: <AiOutlineSmile size={24} color="#ff6d60" />,
    isNavigatedButton: true,
  },
];

export default function NavigationBar() {
  const pathName = usePathname();
  const route = useRouter();

  const userId = useSelector((state: RootState) => state.user.userId);

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
              {item.isNavigatedButton === false ? (
                <RecordingButton page={pathName} />
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

  function handleNavigationButton(pathName: string) {
    if (pathName === "/mypage") {
      if (userId.length == 0) {
        MySwal.fire("로그인 후 이용 가능합니다.");
        route.push("/login");
      } else {
        route.push(pathName);
      }
    } else if (pathName === "/mission") {
      MySwal.fire("도전과제 Coming Soon👋");
    } else {
      route.push(pathName);
    }
  }

  function getNavigationBarStyle(pathName: string): string {
    if (pathName.includes("shorts")) {
      // border-t-1 border-[#DEE2E6]
      return "h-61 pt-8 pb-8 fixed min-w-390 bottom-0 z-50 bg-dubblack ";
    } else {
      return "h-61 pt-8 pb-8 fixed  min-w-390 bottom-0 z-50 bg-white border-t-1 border-[#DEE2E6]";
    }
  }
}
