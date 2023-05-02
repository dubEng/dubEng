import { useState } from "react";

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
    english: text,
    korean: translation,
    start: start,
    end: start + duration,
  });

  const handleNewScript = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewScript({
      ...newScript,
      [name]: value,
    });
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
          name="english"
          value={newScript.english}
          onChange={handleNewScript}
        />
      </div>
      <div className="flex justify-between">
        <p>한국어</p>
        <p>{translation}</p>
        <input
          type="text"
          name="korean"
          value={newScript.korean}
          onChange={handleNewScript}
        />
      </div>
      <input
        type="number"
        value={newScript.start}
        name="start"
        onChange={handleNewScript}
      />{" "}
      ~
      <input
        type="number"
        value={newScript.end}
        name="end"
        onChange={handleNewScript}
      />
      <br />
      <label htmlFor={start.toString()}>더빙 여부</label>
      <br />
      <div>
        <label htmlFor="true">해당</label>
        <input
          type="radio"
          value="true"
          id={start.toString()}
          name={start.toString()}
        />
        <label htmlFor="false">해당 없음</label>
        <input
          type="radio"
          value="false"
          id={start.toString()}
          name={start.toString()}
        />
      </div>
      <hr />
    </div>
  );
}
