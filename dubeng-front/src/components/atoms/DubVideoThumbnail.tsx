import Image from "next/image";
import WeBareBears from "../../../public/images/dump/webarebears_image.png";
// import { DubProduct } from "@/types/DubProduct";

interface Iprops {
  id: number;
  title: string;
  thumbnail: string;
  nickname?: string;
  userProfileImg?: string;
}

export default function DubVideoThumbnail({
  id,
  title,
  thumbnail,
  nickname,
  userProfileImg,
}: Iprops) {
  return (
    <div className="relative object-cover">
      <Image
        src={thumbnail}
        className="rounded-18 w-272 h-152"
        alt={title}
        width={272}
        height={152}
      />
      <div className="opacity-50 absolute top-0 left-0 w-251 h-152 rounded-18"></div>
      <div className="flex space-x-8 justify-center items-center absolute bottom-16 left-16 right-16 text-white font-semibold text-12">
        {userProfileImg && (
          <Image src={userProfileImg} alt={"userProfileImg"} />
        )}
        <p>{nickname} | </p>
        <p className="line-clamp-1">{title}</p>
      </div>
    </div>
  );
}
