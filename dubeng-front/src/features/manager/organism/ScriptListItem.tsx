import { useState } from "react";

interface Iprops {
  duration: number;
  start: number;
  text: string;
  subTitle: string;
}

export default function ScriptListItem({
  duration,
  start,
  text,
  subTitle,
}: Iprops) {
  const [newTexts, setNewTexts] = useState({
    english: text,
    korean: subTitle,
  });

  const handleNewTexts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewTexts({
      ...newTexts,
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
          value={newTexts.english}
          onChange={handleNewTexts}
        />
      </div>
      <div className="flex justify-between">
        <p>한국어</p>
        <p>{subTitle}</p>
        <input
          type="text"
          name="korean"
          value={newTexts.korean}
          onChange={handleNewTexts}
        />
      </div>
      <p>문장별 구간 설정</p>
      <input type="number" />
      ~
      <input type="number" />
      <hr />
    </div>
  );
}
