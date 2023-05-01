import { CommonAlertType } from "../../enum/statusType";

interface Iprops {
  type: CommonAlertType;
}

export default function CommonAlert({ type }: Iprops) {
  if (type === CommonAlertType.DUBBING_OUT) {
    return (
      <div className="w-310 h-134 flex flex-col bg-white rounded-3">
        <div className="h-95 mx-64 pt-25">
          <p className="text-dubblack text-14 text-center">
            더빙중에 나가면 변경사항이
          </p>
          <p className="text-dubblack text-14 text-center">
            저장되지 않습니다.
          </p>
        </div>
        <div className="flex">
          <div className="w-155 h-51 rounded-1 border-t-1 border-r-1 border-[#dee2e6] flex justify-center items-center">
            <button className="text-dubblack text-16 text-center m-0">
              취소
            </button>
          </div>
          <div className="w-155 h-51 rounded-1 border-t-1 border-[#dee2e6] flex justify-center items-center">
            <button className="text-dubcoral text-16 text-center m-0">
              나가기
            </button>
          </div>
        </div>
      </div>
    );
  } else if (type === CommonAlertType.COMMENT_DELETE) {
    return (
      <div className="w-310 h-134 flex flex-col bg-white rounded-3">
        <div className="h-95 mx-64 pt-35">
          <p className="text-dubblack text-14 text-center">
            댓글을 삭제하시겠습니까?
          </p>
        </div>
        <div className="flex">
          <div className="w-155 h-51 rounded-1 border-t-1 border-r-1 border-[#dee2e6] flex justify-center items-center">
            <button className="text-dubblack text-16 text-center m-0">
              취소
            </button>
          </div>
          <div className="w-155 h-51 rounded-1 border-t-1 border-[#dee2e6] flex justify-center items-center">
            <button className="text-dubcoral text-16 text-center m-0">
              삭제
            </button>
          </div>
        </div>
      </div>
    );
  } else if (type === CommonAlertType.CONTENTS_DELETE) {
    return (
      <div className="w-310 h-134 flex flex-col bg-white rounded-3">
        <div className="h-95 mx-64 pt-35">
          <p className="text-dubblack text-14 text-center">
            콘텐츠를 삭제하시겠습니까?
          </p>
        </div>
        <div className="flex">
          <div className="w-155 h-51 rounded-1 border-t-1 border-r-1 border-[#dee2e6] flex justify-center items-center">
            <button className="text-dubblack text-16 text-center m-0">
              취소
            </button>
          </div>
          <div className="w-155 h-51 rounded-1 border-t-1 border-[#dee2e6] flex justify-center items-center">
            <button className="text-dubcoral text-16 text-center m-0">
              삭제
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
}
