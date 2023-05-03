interface Iprops {
  // width: number;
  // height: number;
  // fontSize: number;
  children: string;
  isDisabled: boolean;
}

export default function CommonButton({ children, isDisabled }: Iprops) {
  if (isDisabled) {
    return (
      <button
        disabled={true}
        className="rounded-8 border-1 border-dubblue bg-dubblue text-white text-16 px-48 py-8"
      >
        {children}
      </button>
    );
  }
  return (
    <button className="rounded-8 border-1 border-dubgraydeep bg-white text-dubgraydeep text-16 px-48 py-8">
      {children}
    </button>
  );
}
