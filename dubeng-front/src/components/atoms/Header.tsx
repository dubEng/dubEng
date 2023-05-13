import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../../../public/images/logo/dubeng_logo.png";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function Header() {
  const route = useRouter();
  const pathName = usePathname();

  if (pathName === "/") {
    return (
      <div className={getHeaderBarStyle()}>
        <Image src={Logo} alt={"logo"} width={98} height={41} />
      </div>
    );
  } else if (pathName === "/community") {
    return <div className={getHeaderBarStyle()}>더빙목록</div>;
  } else if (pathName === "/mypage") {
    return (
      <div className="fixed min-w-390 top-0 z-50 h-57 rounded-2 text-16 font-semibold flex justify-between px-16 items-center bg-white">
        My
        <button>
          <AiOutlineEdit size={19} />
        </button>
      </div>
    );
  } else if (pathName === "/mission") {
    return <div className={getHeaderBarStyle()}>도전과제</div>;
  } else if (pathName === "/mypage/myDubbingProduct") {
    return (
      <div className={getHeaderBarStyle()}>
        <button>
          <MdOutlineArrowBackIos className="mr-8 mb-2" />
        </button>
        나의 상영관
      </div>
    );
  } else if (pathName === "/signup") {
    return (
      <div className={getHeaderBarStyle()}>
        <button
          onClick={() => {
            route.back();
          }}
        >
          <MdOutlineArrowBackIos className="mr-8 mb-2" />
        </button>
        회원가입
      </div>
    );
  } else if (pathName === "/signup/interest") {
    return (
      <div className={getHeaderBarStyle()}>
        <button
          onClick={() => {
            route.back();
          }}
        >
          <MdOutlineArrowBackIos className="mr-8 mb-2" />
        </button>
        회원가입
      </div>
    );
  } else if (pathName === "/signup/kitchen") {
    return (
      <div className={getHeaderBarStyle()}>
        <button
          onClick={() => {
            route.back();
          }}
        >
          <MdOutlineArrowBackIos className="mr-8 mb-2" />
        </button>
        나의 관심사
      </div>
    );
  } else if (pathName === "/mypage/profileEdit") {
    return (
      <div className="fixed min-w-384 top-0 z-50 h-57 rounded-2 text-16 font-semibold flex justify-between px-16 items-center bg-white">
        <div className="flex justify-start items-center">
          <button>
            <MdOutlineArrowBackIos className="mr-8 mb-2" />
          </button>
          프로필 수정
        </div>
        <button>완료</button>
      </div>
    );
  } else if (pathName === "/manager") {
    return <></>;
  } else if (pathName.includes("shorts")) {
    return <div className="min-w-390 h-57 bg-black"></div>;
  } else if (pathName.includes("dubbing")) {
    return <></>;
  } else if (pathName === "/login") {
    return <></>;
  } else {
    return (
      <button className={getHeaderBarStyle()} onClick={handleLogoButtonClick}>
        <Image src={Logo} alt={"logo"} width={98} height={41} />
      </button>
    );
  }

  function handleLogoButtonClick() {
    route.push("/");
  }

  function getHeaderBarStyle(): string {
    return "fixed min-w-390 top-0 z-50 h-57 p-16 rounded-2 text-16 font-semibold bg-white";
  }
}
