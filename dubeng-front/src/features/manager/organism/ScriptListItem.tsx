import { addScriptsInfo } from "@/stores/manager/scriptsPostSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface Iprops {
  duration: number;
  start: number;
  text: string;
  translation: string;
}

export default function ScriptListItem({
  duration,
  start,
  text,
  translation,
}: Iprops) {
  const [newScript, setNewScript] = useState({
    content: text,
    translateContent: translation,
    startTime: start,
    duration: duration,
  });
  const [isDub, setIsDub] = useState(1);

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
  };

  return (
    <div>
      <p>시작시간 : {start}</p>
      <p>지속시간 : {duration}</p>
      <div className="flex justify-between">
        <p>언어</p>
        <p>원본 스크립트</p>
        <p>스크립트 수정</p>
      </div>
      <div className="flex justify-between">
        <p>영어</p>
        <p>{text}</p>
        <input
          type="text"
          name="content"
          value={newScript.content}
          onChange={handleNewScript}
        />
      </div>
      <div className="flex justify-between">
        <p>한국어</p>
        <p>{translation}</p>
        <input
          type="text"
          name="translateContent"
          value={newScript.translateContent}
          onChange={handleNewScript}
        />
      </div>
      <input
        type="number"
        value={newScript.startTime}
        name="startTime"
        onChange={handleNewScript}
      />{" "}
      지속시간
      <input
        type="number"
        value={newScript.duration}
        name="duration"
        onChange={handleNewScript}
      />
      <br />
      <label htmlFor={start.toString()}>더빙 여부</label>
      <br />
      <div>
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
      <button
        className="rounded-8 px-8 py-4 bg-dubcoral text-14 text-white"
        onClick={handleSubmitButton}
      >
        확정
      </button>
      <hr />
    </div>
  );
}
