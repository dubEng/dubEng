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
        className="rounded-18 w-242 h-142"
        alt={title}
        width={272}
        height={152}
      />
      <div className="bg-gradient-to-t from-black opacity-80 absolute top-0 left-0 w-242 h-142 rounded-18"></div>
      <div className="w-242 line-clamp-1 flex space-x-8 items-center absolute bottom-16 left-16 right-16 text-white font-semibold text-12">
        {userProfileImg && (
          <div className="flex">
            <Image
              src={userProfileImg}
              alt={"userProfileImg"}
              width={16}
              height={16}
              className="rounded-full w-16 h-16 mr-4"
            />
            <p className="mr-8">{nickname}</p>
            <p>|</p>
          </div>
        )}
        <p className="line-clamp-1 max-w-[50%]">{title}</p>
      </div>
    </div>
  );
}
