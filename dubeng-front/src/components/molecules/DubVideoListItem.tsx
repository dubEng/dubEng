import Image from "next/image";
import WeBareBears from "../../../public/images/dump/webarebears_image.png";
import DubButton from "../atoms/DubButton";
interface Iprops {
  title: string;
  thumbnail: string;
  runtime: string;
}

export default function DubVideoListItem({
  title,
  thumbnail,
  runtime,
}: Iprops) {
  return (
    <div className="flex p-16 w-358 bg-white rounded-8 border-1 border-dubgraymedium">
      <Image
        src={WeBareBears}
        alt={title}
        width={161}
        height={96}
        className="rounded-4"
      ></Image>
      <div className="flex flex-col ml-16 justify-between">
        <div>
          <p className="text-14 font-semibold text-dubblack">{title}</p>
          <p className="text-dubgray text-12">영상 길이 : {runtime}</p>
        </div>
        <DubButton page={""} />
      </div>
    </div>
  );
}
