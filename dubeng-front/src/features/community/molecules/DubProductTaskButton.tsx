import { MdDeleteOutline } from "react-icons/md";

export default function DubProductTaskButton() {
  return (
    <button className="flex min-w-96 min-h-36 items-center justify-center rounded-4 py-8 bg-white border-1 border-dubgraydeep text-14 text-dubgray">
      <MdDeleteOutline size={20} />
      <p className="ml-3">삭제</p>
    </button>
  );
}
