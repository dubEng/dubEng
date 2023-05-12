import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

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
