import Image from "next/image";

interface Iprops {
  title: string;
  thumbnail: string;
  runtime: string;
  imageUrl: string;
  nickname: string;
  playCount: number;
  updatedDate: string;
}

export default function DubProductListItem({
  title,
  thumbnail,
  runtime,
  imageUrl,
  nickname,
  playCount,
  updatedDate,
}: Iprops) {
  return (
    <div className="flex p-16 w-358 bg-white rounded-8 border-1 border-dubgraymedium">
      <Image
        src={thumbnail}
        alt={title}
        width={161}
        height={96}
        className="rounded-4"
      ></Image>
      <div className="flex flex-col ml-16 justify-between">
        <p className="text-14 font-semibold text-dubblack">{title}</p>
        <p className="text-dubgray text-12">영상 길이 : {runtime}</p>

        <div className="flex items-center">
          <div className="flex justify-end">
            <Image
              src={imageUrl}
              alt={"profile"}
              width={16}
              height={16}
              className="rounded-full"
            />
          </div>
          <p className="pl-4 text-dubgray text-12">{nickname}</p>
        </div>

        <p className="text-dubgray text-12">
          조회수 {playCount}회 ▪ {updatedDate}전
        </p>
      </div>
    </div>
  );
}
