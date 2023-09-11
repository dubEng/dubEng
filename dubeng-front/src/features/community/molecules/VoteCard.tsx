import Image from "next/image";
import { MdPlayArrow } from "react-icons/md";
import { MdPause } from "react-icons/md";

interface Iprops {
  username: string;
  description: string;
  userImage: string;
  isPlaying: boolean;
  onClick: () => void;
}

export default function VoteCard({
  username,
  description,
  userImage,
  isPlaying,
  onClick,
}: Iprops) {
  if (isPlaying) {
    return (
      <div className="relative py-12 flex flex-col  items-center rounded-8 w-full h-140 bg-white border-1 border-dubgraydeep">
        <Image
          src={userImage}
          alt="userImage"
          className="rounded-full"
          width={32}
          height={32}
        ></Image>
        <div className="flex flex-col justify-center items-center self-center">
          <p className="mt-4 text-14 text-dubblack font-semibold">{username}</p>
          <p className="leading-14 px-24 text-center text-12 text-dubgray">
            {description}
          </p>
        </div>
        <div className="absolute bottom-10">
          <MdPause
            className="mt-4 cursor-pointer"
            size={24}
            onClick={onClick}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative py-12 flex flex-col items-center rounded-8 w-full h-140 bg-white border-1 border-dubgraydeep">
        <Image
          src={userImage}
          alt="userImage"
          className="rounded-full"
          width={32}
          height={32}
        ></Image>
        <div className="flex flex-col justify-center items-center self-center">
          <p className="mt-4 text-14 text-dubblack font-semibold">{username}</p>
          <p className="leading-14 px-24 text-center text-12 text-dubgray">
            {description}
          </p>
        </div>
        <div className="absolute bottom-10">
          <MdPlayArrow
            className="mt-4 cursor-pointer"
            size={24}
            onClick={onClick}
          />
        </div>
      </div>
    );
  }
}
