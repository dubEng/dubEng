import DubVideoThumbnail from "@/components/atoms/DubVideoThumbnail";
import VoteCard from "../molecules/VoteCard";
import VoteButton from "../atoms/VoteButton";

export default function Vote() {
  function handleButton() {
    console.log("플레이버튼 눌렀다!");
  }
  return (
    <div className="flex flex-col items-center justify-center p-16 bg-[#FFFAFA] rounded-8 border-1 border-[#FFD8D8]">
      <div className="border-1 bg-dubgraymedium">
        더빙 영상 재생파트 들어갈 곳
      </div>
      <div className="flex justify-between">
        <div className="space-y-16">
          <VoteCard
            username={"김도언"}
            description="김도언의 한 줄 소개 입니다."
            userImage=""
            isPlaying={false}
            onClick={handleButton}
          />
          <VoteButton isSelected={false} onClick={handleButton} />
        </div>
        <p className="text-16 font-semibold text-dubgray mt-55">vs</p>
        <div className="space-y-16">
          <VoteCard
            username={"하이하이하이하"}
            description="언도"
            userImage=""
            isPlaying={false}
            onClick={handleButton}
          />
          <VoteButton isSelected={false} onClick={handleButton} />
        </div>
      </div>
    </div>
  );
}
