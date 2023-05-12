import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import DubProductCard from "@/features/mypage/molecules/DubProductCard";
import WeBareBears from "../../../public/images/dump/webarebears_image.png";

export default function MyPage() {
  const userId = useSelector((state: RootState) => state.user.userId);
  const nickname = useSelector((state: RootState) => state.user.nickname);

  return (
    <>
      userId: {userId} <br />
      nickname: {nickname}
      <DubProductCard
        title="최악의 ui를 위한 한 줄 다 채우기 제목"
        thumbnail={"https://i.ytimg.com/vi/lu4RHvouJH8/maxresdefault.jpg"}
        playCount={11}
        updatedDate="2020"
      />
    </>
  );
}
