import { MdArrowForwardIos } from "react-icons/md";

// interface Iprops {
//   width: number;
//   height: number;
//   fontSize: number;
// children: string;
// isDisabled: boolean;
//   onClick: () => void;
// }
interface Iprops {
  page: string;
}

export default function DubButton({ page }: Iprops) {
  if (page === "/community/shorts") {
    return (
      <button className="flex text-14 rounded-20 p-6 pl-16 pr-10 bg-blue-300 border-dubgray font-semibold text-dubgray">
        <div className="flex justify-center items-center">
          <p className="pt-1">더빙하기</p>
          <MdArrowForwardIos size={20} color="dubgray" />
        </div>
      </button>
    );
  } else {
    return (
      <button className="flex text-14 rounded-20 p-6 pl-16 pr-10 bg-blue-300 border-dubgraylight font-semibold text-dubgraylight">
        <div className="flex justify-center items-center">
          <p className="pt-1">더빙하기</p>
          <MdArrowForwardIos size={20} color="dubgray" />
        </div>
      </button>
    );
  }
}
