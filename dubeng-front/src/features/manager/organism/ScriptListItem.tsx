import { addScriptsInfo } from "../../../stores/manager/scriptsPostSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface Iprops {
  duration: number | string;
  start: number | string;
  text: string;
  translation: string;
  handleListenScript: (e: number | string, s: number | string) => void;
}

export default function ScriptListItem({
  duration,
  start,
  text,
  translation,
  handleListenScript,
}: Iprops) {
  const [newScript, setNewScript] = useState({
    content: text,
    translateContent: translation,
    startTime: start,
    duration: duration,
  });
  const [isDub, setIsDub] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleNewScript = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewScript({
      ...newScript,
      [name]: value,
    });
  };

  // 라디오버튼 조작
  const handleClickRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDub(parseInt(e.target.value));
  };

  const dispatch = useDispatch();

  const handleSubmitButton = () => {
    // dispatch해줄 것
    const scriptsToSubmit = { ...newScript, isDub: isDub };
    dispatch(addScriptsInfo(scriptsToSubmit));

    // const test = useSelector((state) => state);
    // console.log(test);
    setIsConfirmed(true);
  };

  return (
    <div className="p-16">
      <div className="space-y-8">
        <div className="flex grid grid-cols-7">
          <p className="col-span-1 text-20 font-semibold">언어</p>
          <p className="col-span-3 text-20 font-semibold">원본 스크립트</p>
          <p className="col-span-3 text-20 font-semibold">스크립트 수정</p>
        </div>
        <div className="flex grid grid-cols-7 items-center">
          <p className="col-span-1">영어</p>
          <p className="col-span-3">{text}</p>
          <input
            className="col-span-3 text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-full border border-[#E9ECEF] pl-16 py-12"
            type="text"
            name="content"
            value={newScript.content}
            onChange={handleNewScript}
          />
        </div>
        <div className="flex grid grid-cols-7 items-center">
          <p className="col-span-1">한국어</p>
          <p className="col-span-3">{translation}</p>
          <input
            className="col-span-3 text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h- w-full border border-[#E9ECEF] pl-16 py-12"
            type="text"
            name="translateContent"
            value={newScript.translateContent}
            onChange={handleNewScript}
          />
        </div>
        <p className="col-span-1 text-20 font-semibold">문장별 구간 설정</p>
        <div className="flex items-center space-x-24">
          <div>
            <p>시작 시간</p>
            <input
              className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-100 border border-[#E9ECEF] pl-16 py-12"
              type="number"
              name="startTime"
              onChange={handleNewScript}
              value={newScript.startTime}
              placeholder="시작 시간"
            />
          </div>

          <div>
            <p>지속 시간</p>
            <input
              className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-100 border border-[#E9ECEF] pl-16 py-12"
              type="number"
              name="duration"
              onChange={handleNewScript}
              value={newScript.duration}
              placeholder="지속 시간"
            />
          </div>
          <div>
            <p>구간 확인</p>
            <button
              className="rounded-8 border-1 border-dubblue p-8"
              onClick={() =>
                handleListenScript(newScript.startTime, newScript.duration)
              }
            >
              미리듣기
            </button>
          </div>
        </div>
        <p className="col-span-1 text-20 font-semibold">더빙 여부 선택</p>
        <div>
          {/* <label htmlFor={start.toString()}>더빙 여부</label> */}
          <div className="flex space-x-8">
            <label htmlFor="1">해당</label>
            <input
              type="radio"
              value={1}
              checked={isDub === 1}
              id={start.toString()}
              name={start.toString()}
              onChange={handleClickRadioButton}
            />
            <label htmlFor="0">해당 없음</label>
            <input
              type="radio"
              value={0}
              checked={isDub === 0}
              id={start.toString()}
              name={start.toString()}
              onChange={handleClickRadioButton}
            />
          </div>
        </div>
        <div className="flex items-center space-x-16">
          <button
            className="rounded-[8px] bg-dubblue px-16 h-43 pb-0 text-white"
            onClick={handleSubmitButton}
            disabled={isConfirmed}
          >
            확정
          </button>
          {isConfirmed && (
            <p className="text-green-500">
              ✔ 스크립트 정보가 정상적으로 저장되었습니다.
            </p>
          )}
        </div>
      </div>
      <br />
      <hr />
    </div>
  );
}
