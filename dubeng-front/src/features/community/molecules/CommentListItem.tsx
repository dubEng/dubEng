import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import Image from "next/image";
import { MdMoreHoriz } from "react-icons/md";

interface Iprops {
  userId: string;
  nickName: string;
  userImage: string;
  content: string;
  updatedDate: string;
}

export default function CommentListItem({
  userId,
  nickName,
  userImage,
  content,
  updatedDate,
}: Iprops) {
  const userIdData = useSelector((state: RootState) => state.user.userId);

  if (userIdData === userId) {
    return (
      <div className="flex w-291 space-x-8 border-1 border-black">
        <Image
          className="rounded-full max-h-40 mt-4"
          src={userImage}
          alt="userImage"
          width={40}
          height={40}
        ></Image>
        <div className="space-y-1">
          <div className="flex items-center space-x-4">
            <p className="text-16 text-dubblack font-bold">{nickName}</p>
            <p className="text-12 text-dubgray ">{updatedDate} 전</p>
            <div className="">
              <MdMoreHoriz className="right-0 text-dubblack" size={24} />
            </div>
          </div>
          <div>
            <p className="text-14 text-dubblack">{content}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-291 space-x-8 border-1 border-black">
        <Image
          className="rounded-full max-h-40 mt-4"
          src={userImage}
          alt="userImage"
          width={40}
          height={40}
        ></Image>
        <div className="space-y-1">
          <div className="flex items-center space-x-4">
            <p className="text-16 text-dubblack font-bold">{nickName}</p>
            <p className="text-12 text-dubgray ">{updatedDate} 전</p>
          </div>
          <div>
            <p className="text-14 text-dubblack">{content}</p>
          </div>
        </div>
      </div>
    );
  }
}
