import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

export default function CommentTaskButton() {
  return (
    <div className="flex flex-col w-96">
      <button className="flex items-center justify-center rounded-t-4 py-8 bg-white border-1 border-dubgraydeep text-14 text-dubgray">
        <AiOutlineEdit size={20} />
        <p className="ml-3">수정</p>
      </button>
      <button className="flex items-center justify-center relative -top-1 rounded-b-4 py-8 bg-white border-1 border-dubgraydeep text-14 text-dubgray">
        <MdDeleteOutline size={20} />
        <p className="ml-3">삭제</p>
      </button>
    </div>
  );
}
