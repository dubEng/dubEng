import Image from "next/image";
import { AiTwotoneCrown } from "react-icons/ai";

interface Iprops {
  ranking: number;
  nickname: string;
  totalCount: number;
  dubKingImageUrl: string;
}

export default function DubKingItem({
  ranking,
  nickname,
  totalCount,
  dubKingImageUrl,
}: Iprops) {
  if (ranking == 1) {
    return (
      <div className="container w-90 h-137">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={dubKingImageUrl}
            alt={"dubKingProfile"}
            width={80}
            height={80}
            className="rounded-full border-5 border-[#FFD02B]"
          />
          <div className="flex flex-row justify-center items-center">
            <AiTwotoneCrown color="#FFD02B" />
            <p className="text-16 font-semibold">{nickname}</p>
          </div>
          <p className="text-16 font-semibold">{totalCount}표</p>
        </div>
      </div>
    );
  } else if (ranking == 2) {
    return (
      <div className="container w-90 h-137">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={dubKingImageUrl}
            alt={"dubKingProfile"}
            width={72}
            height={72}
            className="rounded-full border-5 border-[#C6C6C6]"
          />
          <div className="flex flex-row justify-center items-center">
            <p className="text-14 font-semibold">{nickname}</p>
          </div>
          <p className="text-14 font-semibold">{totalCount}표</p>
        </div>
      </div>
    );
  } else if (ranking == 3) {
    return (
      <div className="container w-90 h-137">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={dubKingImageUrl}
            alt={"dubKingProfile"}
            width={72}
            height={72}
            className="rounded-full border-5 border-[#B16B55]"
          />
          <div className="flex flex-row justify-center items-center">
            <p className="text-14 font-semibold">{nickname}</p>
          </div>
          <p className="text-14 font-semibold">{totalCount}표</p>
        </div>
      </div>
    );
  }

  return <></>;
}
