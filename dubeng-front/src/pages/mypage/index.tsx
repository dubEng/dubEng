import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import DubProductCard from "@/features/mypage/molecules/DubProductCard";
import WeBareBears from "../../../public/images/dump/webarebears_image.png";

export default function MyPage() {
  const userId = useSelector((state: RootState) => state.user.userId);
  const nickname = useSelector((state: RootState) => state.user.nickname);

  return (
    <div>
      <div className="w-200 h-500">하이</div>
      <DubProductCard
        title={"안녕안녕안녕하세요"}
        thumbnail={""}
        playCount={11}
        updatedDate={""}
      />
      <div className="h-screen bg-white mt-57 mb-61">
        userId: {userId} <br />
        nickname: {nickname}
      </div>
    </div>
  );
}
