import { useState } from "react";
import useGetVideoInfoQuery from "@/apis/manager/queries/useGetVideoInfoQuery";
import ScriptListItem from "@/features/manager/organism/ScriptListItem";
import useCategoryQuery from "@/apis/manager/queries/useCategoryQuery";

export default function ManagerPage() {
  // 다중 input값 저장 객체
  const [inputs, setInputs] = useState({
    url: "",
    start: 0,
    end: 0,
    lang: "",
  });

  const scripts = [
    {
      duration: 1.126,
      start: 49.007,
      text: "Oh, my God. He's..",
      subTitle: "안녕",
    },
    {
      duration: 1.836,
      start: 50.216,
      text: "Look at the way\nhe's just staring at me.",
      subTitle: "안녕",
    },
    {
      duration: 1.502,
      start: 53.219,
      text: "I think he's tryin'\nto mouth something at me",
      subTitle: "안녕",
    },
    {
      duration: 1.335,
      start: 54.804,
      text: "but I can't make it out.",
      subTitle: "안녕",
    },
    {
      duration: 1.627,
      start: 60.393,
      text: "Okay, dinner's ready.",
      subTitle: "안녕",
    },
    {
      duration: 1.21,
      start: 62.103,
      text: "- Good game.\n- Yeah.",
      subTitle: "안녕",
    },
    {
      duration: 1.669,
      start: 63.354,
      text: "Yeah, solid effort,\nsolid effort.",
      subTitle: "안녕",
    },
  ];

  // // 다중 requestbody 값 저장 객체
  // const videoInfo, setVideoInfo] = useState({});

  // 비구조화 할당
  const { url, start, end, lang } = inputs;

  // react-query
  const getVideoInfo = useGetVideoInfoQuery(url, start, end, lang);

  // 카테고리 조회 react-query
  // const { data } = useCategoryQuery();
  const data = [
    {
      id: 1,
      name: "판타지",
    },
    {
      id: 2,
      name: "로맨스",
    },
  ];

  // input값 onChange
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 요청 보내는 파트
  function handleGetVideo() {
    console.log(inputs);
  }
  function handleSaveVideo() {
    console.log("등록하기 버튼 눌렀다!");
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
        </div>
        <div>
          <label htmlFor="lang">언어</label>
          <br />
          <div>
            <label htmlFor="english">English</label>
            <input
              type="radio"
              value="english"
              id="english"
              name="lang"
              onChange={onChangeValue}
            />
            <label htmlFor="korean">한국어</label>
            <input
              type="radio"
              value="korean"
              id="korean"
              name="lang"
              onChange={onChangeValue}
            />
          </div>
        </div>
        <button
          className="rounded-[8px] bg-dubblue px-16"
          onClick={handleGetVideo}
        >
          불러오기
        </button>
      </div>
      <p className="text-24 font-bold">더빙 콘텐츠 정보</p>

      <p>콘텐츠 미리보기</p>
      {/* <iframe
        src="https://www.youtube.com/watch?v=vQM7qLK0fV0&t=2s"
        frameBorder="0"
      ></iframe> */}

      <p>썸네일</p>
      <img src="#" alt="videoThumbnail" />

      <label htmlFor="videoTitle">콘텐츠 제목</label>
      <input type="text" />

      <label htmlFor="videoRuntime">런타임</label>
      <input type="number" />

      <label htmlFor="videoLanguage">영상 언어</label>
      <br />
      <div>
        <label htmlFor="english">English</label>
        <input
          type="radio"
          value="english"
          id="english"
          name="lang"
          onChange={onChangeValue}
        />
        <label htmlFor="korean">한국어</label>
        <input
          type="radio"
          value="korean"
          id="korean"
          name="lang"
          onChange={onChangeValue}
        />
      </div>

      <label htmlFor="videoProduction">제작사</label>
      <input type="text" />

      <p className="text-24 font-bold">스크립트</p>
      {scripts.map((script, idx) => (
        <ScriptListItem {...script} key={script.start} />
      ))}

      <p className="text-24 font-bold">콘텐츠 정보 입력하기</p>
      <p>카테고리</p>
      {data.map((category: { name: any }, idx: any) => category.name)}
      <p>음성 파일 첨부</p>
      <button
        className="rounded-[8px] bg-dubblue px-16"
        onClick={handleSaveVideo}
      >
        등록하기
      </button>
    </div>
  );
}
