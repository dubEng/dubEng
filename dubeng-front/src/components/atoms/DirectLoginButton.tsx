interface Iprops {
  children: string;
}

export default function CommonButton({ children }: Iprops) {
  return (
    <button className="mt-4 rounded-8 border-1 border-[#ffccc8] bg-[#ffb9b3] text-white text-14 px-20 py-4">
      {children}
    </button>
  );
}
