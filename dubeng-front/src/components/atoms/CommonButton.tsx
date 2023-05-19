interface Iprops {
  // width: number;
  // height: number;
  // fontSize: number;
  children: string;
  isDisabled?: boolean;
  onClick: () => void;
}

<<<<<<< HEAD
export default function CommonButton({ children, isDisabled }: Iprops) {
  return (
    <button className="rounded-8 bg-dubblue text-dubgraylight text-16 px-48 py-8">
      저장하기
=======
export default function CommonButton({
  children,
  isDisabled,
  onClick,
}: Iprops) {
  if (!isDisabled) {
    return (
      <button
        onClick={onClick}
        className="rounded-8 border-1 border-dubblue bg-dubblue text-white text-16 px-48 py-8"
      >
        {children}
      </button>
    );
  }
  return (
    <button
      disabled
      className="rounded-8 border-1 border-dubgraydeep bg-white text-dubgraydeep text-16 px-48 py-8"
      onClick={onClick}
    >
      {children}
>>>>>>> develop-front
    </button>
  );
}
