interface Iprops {
  // width: number;
  // height: number;
  // fontSize: number;
  children: string;
  isDisabled: boolean;
}

export default function CommonButton({ children, isDisabled }: Iprops) {
  return (
    <button className="rounded-8 bg-dubblue text-dubgraylight text-16 px-48 py-8">
      저장하기
    </button>
  );
}
