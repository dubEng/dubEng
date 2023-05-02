interface Iprops {
  type: string;
  name: string;
  value: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  placeholder: string;
}

export default function CommonInputBox({
  type,
  name,
  value,
  onChange,
  onKeyDown,
  placeholder = "텍스트를 입력해주세요",
}: Iprops) {
  return (
    <input
      className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-358 border border-[#E9ECEF] pl-16 py-12"
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
}
