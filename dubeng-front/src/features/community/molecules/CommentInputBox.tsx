import { MdArrowUpward } from "react-icons/md";

interface Iprops {
  type: string;
  name: string;
  value: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  placeholder: string;
}

export default function CommentInputBox({
  type,
  name,
  onChange,
  value,
  placeholder = "댓글을 입력해주세요.",
  onKeyDown,
}: Iprops) {
  return (
    <div className="flex place-content-between items-center w-358">
      <input
        className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-40 w-320 border border-[#E9ECEF] pl-16 py-12"
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
      <div className="flex items-center justify-center bg-dubcoral rounded-full w-32 h-32">
        <MdArrowUpward className="text-dubivory" size={24} />
      </div>
    </div>
  );
}
