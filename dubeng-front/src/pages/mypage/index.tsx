import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import DubProductCard from "@/features/mypage/molecules/DubProductCard";
import WeBareBears from "../../../public/images/dump/webarebears_image.png";

export default function MyPage() {
  const userId = useSelector((state: RootState) => state.user.userId);
  const nickname = useSelector((state: RootState) => state.user.nickname);

  return (
    <div className="h-screen">
      userId: {userId} <br />
      nickname: {nickname}
    </div>
  );
}
