import Image from "next/image";
import EmptyImage from "../../../public/images/logo/EmptyImage.png";
import { EmptyType } from "../../enum/statusType";
import CommonButton from "./CommonButton";
import DirectLoginButton from "./DirectLoginButton";
import Link from "next/link";

interface Iprops {
  status: string;
}

export default function EmptyComponent({ status }: Iprops) {
  if (status === EmptyType.EMPTY_DUB_PRODUCT) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src={EmptyImage} alt="EmptyImage" />
        <p className="mt-10 text-14 font-semibold text-dubgray">
          더빙이 존재하지 않습니다
        </p>
      </div>
    );
  } else if (status === EmptyType.EMPTY_LIKE_DUB_PRODUCT) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src={EmptyImage} alt="EmptyImage" />
        <p className="mt-10 text-14 font-semibold text-dubgray">
          좋아요한 더빙이 존재하지 않습니다
        </p>
      </div>
    );
  } else if (status === EmptyType.EMPTY_SCRAP_DUB_VIDEO) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src={EmptyImage} alt="EmptyImage" />
        <p className="mt-10 text-14 font-semibold text-dubgray">
          저장한 콘텐츠가 존재하지 않습니다
        </p>
      </div>
    );
  } else if (status === EmptyType.EMPTY_COMMENT) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src={EmptyImage} alt="EmptyImage" />
        <p className="mt-10 text-14 font-semibold text-dubgray">
          댓글이 존재하지 않습니다
        </p>
      </div>
    );
  } else if (status === EmptyType.EMPTY_VOTE) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src={EmptyImage} alt="EmptyImage" />
        <p className="mt-10 text-14 font-semibold text-dubgray">
          오늘은 더 이상 투표할 수 없습니다
        </p>
      </div>
    );
  } else if (status === EmptyType.NO_RECOMMEND_ANONY) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src={EmptyImage} alt="EmptyImage" />
        <p className="mt-10 text-14 font-semibold text-dubgray">
          로그인하여 맞춤형 영상을 추천 받아보세요!
        </p>
        <Link href={"/login"}>
          <DirectLoginButton children={"지금 바로 로그인하기"} />
        </Link>
      </div>
    );
  } else if (status === EmptyType.KOREAN_VOTE) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src={EmptyImage} alt="EmptyImage" />
        <p className="mt-10 text-14 font-semibold text-dubgray">
          한국어 콘텐츠는 투표를 제공하지 않습니다
        </p>
      </div>
    );
  } else if (status === EmptyType.NO_VOTE_ANONY) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src={EmptyImage} alt="EmptyImage" />
        <p className="mt-10 text-14 font-semibold text-dubgray">
          로그인하여 더빙왕을 투표해보세요!
        </p>
        <Link href={"/login"}>
          <DirectLoginButton children={"지금 바로 로그인하기"} />
        </Link>
      </div>
    );
  }
  return <></>;
}
