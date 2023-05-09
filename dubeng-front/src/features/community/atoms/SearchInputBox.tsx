import Image from "next/image";
import searchIcon from "../../../../public/icons/search-icon/search 1.svg";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
interface Iprops {
  type: string;
  name: string;
  value: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  placeholder: string;
}

export default function SearchInputBox({
  type,
  name,
  value,
  onChange,
  onKeyDown,
  placeholder,
}: Iprops) {
  // const [value, setValue] = useState(value);

  // const handleSearchInputClear = () => {
  //   setValue("");
  // };
  if (value) {
    return (
      <div className="flex relative items-center w-358 h-43">
        <input
          className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-358 border border-[#E9ECEF] pl-35 py-12"
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        />
        <Image
          src={searchIcon}
          alt="searchIcon"
          className="absolute ml-11"
        ></Image>
        <AiFillCloseCircle
          className="absolute right-11 text-dubgray"
          size={20}
          // onClick={handleSearchInputClear}
        />
      </div>
    );
  } else {
    return (
      <div className="flex relative items-center">
        <input
          className="flex justify-center text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-358 border border-[#E9ECEF] pl-35 py-12"
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        />
        <Image
          src={searchIcon}
          alt="searchIcon"
          className="absolute ml-11"
        ></Image>
      </div>
    );
  }
}
