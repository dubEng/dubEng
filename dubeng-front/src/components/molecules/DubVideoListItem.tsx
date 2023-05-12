import Image from "next/image";
import WeBareBears from "../../../public/images/dump/webarebears_image.png";
import DubButton from "../atoms/DubButton";
import Link from "next/link";
interface Iprops {
  id: number;
  title: string;
  thumbnail: string;
  runtime: number;
}

export default function DubVideoListItem({
  id,
  title,
  thumbnail,
  runtime,
}: Iprops) {
  function secondsToMinutes(runtime: number) {
    const minutes = Math.floor(runtime / 60);
    const remainingSeconds = runtime % 60;
    return [minutes, remainingSeconds];
  }

  const runtimeList = secondsToMinutes(runtime);

  return (
    <div className="grid grid-cols-2 p-16 w-358 bg-white rounded-8 border-1 border-dubgraymedium">
      <Link href={`/community/shorts/video/${id}`}>
        <Image
          src={thumbnail}
          alt={title}
          width={161}
          height={96}
          className="rounded-4"
        />
      </Link>
      <div className="flex flex-col ml-16 justify-between">
        <div>
          <Link href={`/community/shorts/video/${id}`}>
            <p className="leading-18 break-words text-14 font-semibold text-dubblack line-clamp-2 ">
              {title}
            </p>
          </Link>
          {runtimeList[0] === 0 ? (
            <p className="text-dubgray text-12">
              영상 길이 : {runtimeList[1]}초
            </p>
          ) : (
            <p className="text-dubgray text-12">
              영상 길이 : {runtimeList[0]}분 {runtimeList[1]}초
            </p>
          )}
        </div>
        <Link href={`/dubbing/${id}`}>
          <DubButton page={""} />
        </Link>
      </div>
    </div>
  );
}
