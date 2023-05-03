import { MdCheckCircle } from "react-icons/md";

interface Iprops {
  isSelected: boolean;
  onClick: () => void;
}

export default function VoteButton({ isSelected, onClick }: Iprops) {
  if (isSelected) {
    return (
      <button
        className="flex justify-center items-center w-140 h-30 px-16 py-8 rounded-8 text-16 text-white bg-dubcoral border-1 border-dubcoral"
        onClick={onClick}
      >
        <p className="pb-1">투표 완료</p>
        <MdCheckCircle className="ml-3" size={16} />
      </button>
    );
  } else {
    return (
      <button
        className="flex justify-center items-center w-140 h-30 px-16 py-8 rounded-8 text-16 text-dubcoral bg-white border-1 border-dubcoral"
        onClick={onClick}
      >
        <p className="pb-1">투표</p>
      </button>
    );
  }
}
