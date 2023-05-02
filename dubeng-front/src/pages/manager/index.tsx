import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useGetVideoInfoQuery from "@/apis/manager/queries/useGetVideoInfoQuery";
import ScriptListItem from "@/features/manager/organism/ScriptListItem";
import useCategoryQuery from "@/apis/manager/queries/useCategoryQuery";
import useVideoPost from "@/apis/manager/mutations/useVideoPost";
import CommonInputBox from "@/components/atoms/CommonInputBox";
import TagButton from "@/components/atoms/TagButton";
import { RootState } from "@/stores/store";

export default function ManagerPage() {
  const [inputs, setInputs] = useState({
    url: "",
    start: 0,
    end: 0,
    lang: "",
  });

  // const scripts = [
  //   {
  //     duration: 1.126,
  //     start: 49.007,
  //     text: "Oh, my God. He's..",
  //     translation: "맙소사.  그는..",
  //   },
  //   {
  //     duration: 1.836,
  //     start: 50.216,
  //     text: "Look at the way\nhe's just staring at me.",
  //     translation: "\n나를 쳐다보는 것 좀 봐.",
  //   },
  //   {
  //     duration: 1.502,
  //     start: 53.219,
  //     text: "I think he's tryin'\nto mouth something at me",
  //     translation:
  //       "그가\n나에게 뭔가를 입으로 말하려는 것 같은데 알아들을 수가",
  //   },
  //   {
  //     duration: 1.335,
  //     start: 54.804,
  //     text: "but I can't make it out.",
  //     translation: "없네요.",
  //   },
  //   {
  //     duration: 1.627,
  //     start: 60.393,
  //     text: "Okay, dinner's ready.",
  //     translation: "좋아, 저녁 준비 됐어.",
  //   },
  //   {
  //     duration: 1.21,
  //     start: 62.103,
  //     text: "- Good game.\n- Yeah.",
  //     translation: "- 좋은 경기.\n- 응.",
  //   },
  //   {
  //     duration: 1.669,
  //     start: 63.354,
  //     text: "Yeah, solid effort,\nsolid effort.",
  //     translation: "그래, 확실한 노력,\n확실한 노력.",
  //   },
  // ];

  interface getVideoInfoType {
    channelTitle: string;
    thumbnails: string;
    title: string;
    url: string;
  }

  // 채워넣기 용 비디오 info
  const [videoInfo, setVideoInfo] = useState<getVideoInfoType>();

  interface scriptsType {
    duration: number;
    start: number;
    text: string;
    translation: string;
  }

  interface categoryType {
    id: number;
  }

  //
  const test = useSelector((state) => state);
  console.log("test", test);

  // script 정보 관리하는 useState
  const [scripts, setScripts] = useState<scriptsType[]>([]);

  // // post용
  const mutation = useVideoPost();

  // 비구조화 할당
  const { url, start, end, lang } = inputs;

  // get용 react-query
  const { refetch } = useGetVideoInfoQuery(url, start, end, lang);

  // 영상 성별
  const [gender, setGender] = useState(0);

  const handleClickGenderButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(parseInt(e.target.value));
    console.log(gender);
  };

  // // 카테고리 조회 react-query
  const { data } = useCategoryQuery();

  // 선택한 카테고리 태그
  const [selectedTag, setSelectedTag] = useState<number[]>([]);

  // 태그 선택
  const handleClickTag = (id: number) => {
    if (selectedTag.includes(id)) {
      setSelectedTag(selectedTag.filter((tagId) => tagId !== id));
    } else {
      setSelectedTag([...selectedTag, id]);
    }
  };

  const [audioFile, setAudioFile] = useState<FileList | null>(null);
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    setAudioFile(e.target.files);
  };

  // input값 onChange
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // getVideoInfo 쿼리 호출 파트
  async function getVideoInfo() {
    console.log("getVideoInfo");
    try {
      const videoInfoResult = await refetch();
      console.log("videoInfoResult", videoInfoResult.data.scripts);
      setVideoInfo(videoInfoResult.data.videoInfo);
      setScripts(videoInfoResult.data.scripts);
    } catch (error) {
      console.log(error);
    }
  }
  // url 퍼가기 용으로 수정
  const getIframeUrl = () => {
    if (videoInfo) {
      const originalUrl = videoInfo.url;
      const splitUrl = originalUrl.split("watch?v=");
      const newUrl =
        splitUrl[0] +
        "embed/" +
        splitUrl[1] +
        "?start=" +
        start +
        "&end=" +
        end +
        "&controls=0&rel=0&loop=1";

      console.log(newUrl);
      return newUrl;
    }
  };

  // 요청 보내는 파트
  function handleGetVideoButton() {
    console.log(inputs);
    getVideoInfo();
  }

  function handleSaveVideoButton() {
    console.log("등록하기 버튼 눌렀다!");
    saveDubVideo();
  }

  const userIdData = useSelector((state: RootState) => state.user.userId);
  const scriptsData = useSelector((state: RootState) => state.scriptsPostInfo);

  function makeFormData() {
    const formData = new FormData();

    const video = {
      videoPath: videoInfo?.url,
      title: videoInfo?.title,
      thumbnail: videoInfo?.thumbnails,
      startTime: start,
      endTime: end,
      producer: videoInfo?.channelTitle,
      gender: gender,
      lang: lang,
    };

    const postData = {
      video: video,
      userId: "39576",
      scripts: scriptsData,
      categories: selectedTag,
    };

    console.log("!!! postData", JSON.stringify(postData));

    formData.append(
      "data",
      new Blob([JSON.stringify(postData)], { type: "application/json" })
    );

    console.log("~~~ postData를 붙인 formData", formData);

    if (audioFile) {
      formData.append(`file`, audioFile[0]);
    }

    console.log("!!! audioFile 붙인 formData", formData);

    return formData;
  }

  async function saveDubVideo() {
    const formData = makeFormData();
    console.log("!!!!formData는 여기", formData);

    try {
      const videoPostResult = await mutation.mutateAsync(formData);
    } catch (error) {}
  }

  return (
    <div>
      <p className="text-24 font-bold">더빙 콘텐츠 불러오기</p>
      <div className="flex">
        <div>
          <label htmlFor="url">비디오 링크</label>
          <br />
          <CommonInputBox
            type="text"
            name="url"
            value={url}
            placeholder="비디오 url을 입력하세요."
            onChange={onChangeValue}
          />
        </div>
        <div>
          <label htmlFor="videoInterval">비디오 구간 설정</label>
          <br />
          <CommonInputBox
            type="number"
            name="start"
            value={start}
            placeholder="시작 시간"
            onChange={onChangeValue}
          />
          ~
          <CommonInputBox
            type="number"
            name="end"
            value={end}
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
          onClick={handleGetVideoButton}
        >
          불러오기
        </button>
      </div>
      <p className="text-24 font-bold">더빙 콘텐츠 정보</p>
      {videoInfo && (
        <div>
          <p>콘텐츠 미리보기</p>
          <iframe src={getIframeUrl()}></iframe>

          <p>썸네일</p>
          <img src={videoInfo!.thumbnails} alt="videoThumbnails" />

          <label htmlFor="videoTitle">콘텐츠 제목</label>
          <input type="text" value={videoInfo!.title} />

          <label htmlFor="videoRuntime">런타임</label>
          <input type="number" value={end - start} />

          {/* <label htmlFor="videoLanguage">영상 언어</label>
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
          </div> */}

          {/* <label htmlFor="videoLanguage">더빙 성우 성별</label>
          <br />
          <div>
            <label htmlFor="male">남성</label>
            <input
              type="radio"
              value="male"
              id="male"
              name="gender"
              onChange={onChangeValue}
            />
            <label htmlFor="female">여성</label>
            <input
              type="radio"
              value="female"
              id="female"
              name="gender"
              onChange={onChangeValue}
            />
          </div> */}

          <label htmlFor="videoProduction">제작사</label>
          <input type="text" value={videoInfo!.channelTitle} />

          <p className="text-24 font-bold">스크립트</p>
          {scripts.map((script, idx) => (
            <ScriptListItem {...script} key={idx} />
          ))}
        </div>
      )}

      <p className="text-24 font-bold">콘텐츠 정보 입력하기</p>
      <label htmlFor="videoGender">더빙 성우 성별</label>
      <br />
      <div>
        <label htmlFor="0">남성</label>
        <input
          type="radio"
          value={0}
          checked={gender === 0}
          id="0"
          name="0"
          onChange={handleClickGenderButton}
        />
        <label htmlFor="1">여성</label>
        <input
          type="radio"
          value={1}
          checked={gender === 1}
          id="1"
          name="1"
          onChange={handleClickGenderButton}
        />
      </div>
      <p>카테고리</p>
      <div className="flex">
        {data?.map((tag: { id: number; name: string }, idx: number) => (
          <div onClick={() => handleClickTag(tag.id)}>
            <TagButton
              onClick={() => handleClickTag(tag.id)}
              id={tag.id}
              key={idx}
              name={tag.name}
              isSelected={selectedTag.includes(tag.id) ? true : false}
            />
          </div>
        ))}
      </div>
      <p>음성 파일 첨부</p>
      <input
        type="file"
        name="file"
        id="uploadAudio"
        onChange={handleFileInput}
      />
      <button
        className="rounded-[8px] bg-dubblue px-16"
        onClick={handleSaveVideoButton}
      >
        등록하기
      </button>
    </div>
  );
}
