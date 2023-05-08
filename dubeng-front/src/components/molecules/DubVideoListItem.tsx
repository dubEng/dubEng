import Image from "next/image";
import WeBareBears from "../../../public/images/dump/webarebears_image.png";
import DubButton from "../atoms/DubButton";
import Link from "next/link";
interface Iprops {
  id: number;
  title: string;
  thumbnail: string;
  runtime: string;
}

export default function DubVideoListItem({
  id,
  title,
  thumbnail,
  runtime,
}: Iprops) {
  return (
    <div className="flex p-16 w-358 h-128 bg-white rounded-8 border-1 border-dubgraymedium">
      <Image
        src={thumbnail}
        alt={title}
        width={161}
        height={96}
        className="rounded-4"
      ></Image>
      <div className="flex flex-col ml-16 justify-between">
        <div>
          <p className="leading-18 break-words text-14 font-semibold text-dubblack line-clamp-2 ">
            {title}
          </p>
          <p className="text-dubgray text-12">영상 길이 : {runtime}</p>
        </div>
        <Link href={`/dubbing/${id}`}>
          <DubButton page={""} />
        </Link>
      </div>
    </div>
  );
}
