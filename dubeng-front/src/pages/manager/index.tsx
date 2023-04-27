import { useState } from "react";
import useGetVideoInfoQuery from "@/apis/manager/queries/useGetVideoInfoQuery";

export default function ManagerPage() {
  const [url, setUrl] = useState<string>("");
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);

  const getVideoInfo = useGetVideoInfoQuery(url, start, end);

  const onChangeVideoUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  // const onChangeVideoStart = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setStart(e.target.value);
  // };
  // const onChangeVideoEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEnd(e.target.value);
  // };

  function handleGetVideo() {}

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
            onChange={onChangeVideoUrl}
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
            // onChange={onChangeVideoStart}
          />
          ~
          <input
            type="number"
            id="end"
            name="end"
            placeholder="종료 시간"
            // onChange={onChangeVideoEnd}
          />
          <button onClick={handleGetVideo}>불러오기</button>
        </div>
      </div>
    </div>
  );
}
