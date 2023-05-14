import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import DubProductCard from "@/features/mypage/molecules/DubProductCard";
import WeBareBears from "../../../public/images/dump/webarebears_image.png";
import { SetStateAction, useState } from "react";
import { LangType } from "@/enum/statusType";
import LanguageTap from "@/features/mypage/atoms/LanguageTap";

export default function MyPage() {
  const userId = useSelector((state: RootState) => state.user.userId);
  const nickname = useSelector((state: RootState) => state.user.nickname);

  const [myPageLangIndex, setMyPageLangIndex] = useState(LangType.ENGLISH);

  function handleMyPageLangIndex(presentIndex: LangType) {
    console.log("handle 실행됨", myPageLangIndex);
    setMyPageLangIndex(presentIndex);
  }
  return (
    <div>
      <div className="w-200 h-500">하이</div>
      <LanguageTap
        myPageLangIndex={myPageLangIndex}
        handleMyPageLangIndex={handleMyPageLangIndex}
      />
      <DubProductCard
        title={"안녕안녕안녕"}
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
