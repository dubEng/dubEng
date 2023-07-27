import { ReactNode } from "react";

interface Iprops {
  children: ReactNode;
  pageNumber: number;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function PageButton({
  pageNumber,
  isSelected,
  onClick,
}: Iprops) {
  if (isSelected) {
    return (
      <div
        className="w-24 h-24 text-center rounded-4 bg-dubblack text-white font-semibold cursor-pointer"
        onClick={onClick}
      >
        {pageNumber}
      </div>
    );
  } else {
    return (
      <div
        className="w-24 h-24 text-center rounded-4 font-semibold cursor-pointer"
        onClick={onClick}
      >
        {pageNumber}
      </div>
    );
  }
}
