import Image from "next/image";
interface Iprops {
  // width: number;
  // height: number;
  // fontSize: number;
  name: string;
  imgUrl: string;
}

export default function UserProfile({ name, imgUrl }: Iprops) {
  return (
    <div className="flex justify-center items-center">
      <Image
        className="rounded-100"
        src={imgUrl}
        alt="userProfileImgUrl"
      ></Image>
      <p className="text-dubgraylight text-14">{name}</p>
    </div>
  );
}
