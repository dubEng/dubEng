import { useState } from "react";
import useGetVideoInfoQuery from "@/apis/manager/queries/useGetVideoInfoQuery";

export default function ManagerPage() {
  // 다중 input값 저장 객체
  const [inputs, setInputs] = useState({
    url: "",
    start: 0,
    end: 0,
  });

  // 비구조화 할당
  const { url, start, end } = inputs;

  // react-query
  const getVideoInfo = useGetVideoInfoQuery(url, start, end);

  // input값 onChange
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  function handleGetVideo() {
    console.log(inputs);
  }

  return (
    <div>
      <p className="text-24 font-bold">더빙 콘텐츠 불러오기</p>
      <div className="flex">
        <div>
          <label htmlFor="url">비디오 링크</label>
          <br />
          <input
            type="text"
            id="url"
            name="url"
            placeholder="비디오 url을 입력하세요."
            onChange={onChangeValue}
          />
        </div>
        <div>
          <label htmlFor="videoInterval">비디오 구간 설정</label>
          <br />
          <input
            type="number"
            id="start"
            name="start"
            placeholder="시작 시간"
            onChange={onChangeValue}
          />
          ~
          <input
            type="number"
            id="end"
            name="end"
            placeholder="종료 시간"
            onChange={onChangeValue}
          />
          <button onClick={handleGetVideo}>불러오기</button>
        </div>
      </div>
    </div>
  );
}
