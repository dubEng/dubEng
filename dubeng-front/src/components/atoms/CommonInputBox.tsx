


interface Iprops {
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  placeholder: string;
}

export default function CommonInputBox({
  value,
  onChange,
  onKeyDown,
  placeholder = "텍스트를 입력해주세요"
}: Iprops) {
  return (
      <input
        className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-358 border border-[#E9ECEF] pl-16 py-12"
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
  );
}

