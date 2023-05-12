import Image from "next/image";
import Link from "next/link";

interface Iprops {
  id: number;
  title: string;
  thumbnail: string;
  runtime: number;
  imageUrl: string;
  nickname: string;
  playCount: number;
  createdDate: string;
}

export default function DubProductListItem({
  id,
  title,
  thumbnail,
  runtime,
  imageUrl,
  nickname,
  playCount,
  createdDate,
}: Iprops) {
  return (
    <Link href={`/community/shorts/product/${id}`}>
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
            조회수 {playCount}회 ▪ {createdDate}전
          </p>
        </div>
      </div>
    </Link>
  );
}
