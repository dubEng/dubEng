import Image from "next/image";
import EmptyImage from "../../../public/images/logo/EmptyImage.png";
import { EmptyType } from "../../enum/statusType";

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
  }
  return <></>;
}
