import { MdArrowForwardIos } from "react-icons/md";

interface Iprops {
  type?: string;
  onClick: () => void
}

export default function DubButton({ type, onClick }: Iprops) {
  if (type === "shorts") {
    return (
      <button className="flex text-14 rounded-20 p-6 pl-16 pr-10 border-1 border-dubgraylight font-semibold text-dubgraylight" onClick={onClick}>
        <div className="flex justify-center items-center">
          <p>더빙하기</p>
          <MdArrowForwardIos size={16} color="dubgray" />
        </div>
      </button>
    );
  } else {
    return (
      <button className="flex text-14 rounded-20 p-4 pl-14 pr-8 border-1 border-dubgray font-semibold text-dubgray" onClick={onClick}>
        <div className="flex justify-center items-center">
          <p>더빙하기</p>
          <MdArrowForwardIos size={16} color="dubgray" />
        </div>
      </button>
    );
  }
}
