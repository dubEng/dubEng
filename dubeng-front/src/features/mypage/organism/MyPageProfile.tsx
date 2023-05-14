import Image from "next/image";

interface Iprops {
  nickname: string;
  description: string;
  profileImage: string;
  totalRecTime: number;
  recordCount: number;
}

export default function MyPageProfile({
  nickname,
  description,
  profileImage,
  totalRecTime,
  recordCount,
}: Iprops) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div>
        <Image
          src={profileImage}
          alt="profileImage"
          width={108}
          height={108}
          className="rounded-full bg-dubgraymedium"
        ></Image>
        <p className="mt-16 text-16 text-dubblack font-bold">{nickname}</p>
        <p className="text-14 text-dubgray">{description}</p>
      </div>
      <div className="mt-24 flex justify-center items-center space-x-60">
        <div>
          <p className="text-14 text-dubblack font-semibold">{totalRecTime}</p>
          <p className="text-12 text-dubblack">총 녹음 시간</p>
        </div>
        <div className="bg-dubgray w-1 h-32"></div>
        <div>
          <p className="text-14 text-dubblack font-semibold">{recordCount}</p>
          <p className="text-12 text-dubblack">총 더빙 작품 수</p>
        </div>
      </div>
    </div>
  );
}
