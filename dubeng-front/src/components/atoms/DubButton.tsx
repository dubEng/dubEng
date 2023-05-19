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
  type?: string;
  onClick: () => void;
}

export default function DubButton({ type, onClick }: Iprops) {
  if (type === "shorts") {
    return (
<<<<<<< HEAD
      <button className="flex text-14 rounded-20 p-6 pl-16 pr-10 bg-blue-300 border-dubgray font-semibold text-dubgray">
        <div className="flex justify-center items-center">
          <p className="pt-1">더빙하기</p>
          <MdArrowForwardIos size={20} color="dubgray" />
=======
      <button
        className="w-95 h-35 text-14 rounded-20 p-4 pl-10 pr-6 border-1 border-dubgraylight font-semibold text-dubgraylight"
        onClick={onClick}
      >
        <div className="flex justify-center items-center">
          <p>더빙하기</p>
          <MdArrowForwardIos size={16} className="text-dubgraylight" />
>>>>>>> develop-front
        </div>
      </button>
    );
  } else {
    return (
<<<<<<< HEAD
      <button className="flex text-14 rounded-20 p-6 pl-16 pr-10 bg-blue-300 border-dubgraylight font-semibold text-dubgraylight">
        <div className="flex justify-center items-center">
          <p className="pt-1">더빙하기</p>
          <MdArrowForwardIos size={20} color="dubgray" />
=======
      <button
        className="w-95 h-35 text-14 rounded-20 p-4 pl-10 pr-6 border-1 border-dubgray font-semibold text-dubgray"
        onClick={onClick}
      >
        <div className="flex justify-center items-center">
          <p>더빙하기</p>
          <MdArrowForwardIos size={16} className="text-dubgray" />
>>>>>>> develop-front
        </div>
      </button>
    );
  }
}
