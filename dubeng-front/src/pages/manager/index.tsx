import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetVideoInfoQuery from "@/apis/manager/queries/useGetVideoInfoQuery";
import ScriptListItem from "@/features/manager/organism/ScriptListItem";
import useCategoryQuery from "@/apis/manager/queries/useCategoryQuery";
import useVideoPost from "@/apis/manager/mutations/useVideoPost";
import CommonInputBox from "@/components/atoms/CommonInputBox";
import TagButton from "@/components/atoms/TagButton";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { clearScriptsInfo } from "@/stores/manager/scriptsPostSlice";

import { ScriptsListItem } from "../../stores/manager/scriptsPostSlice";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

interface getVideoInfoType {
  channelTitle: string;
  thumbnails: string;
  title: string;
  url: string;
}
interface scriptsType {
  duration: number;
  start: number;
  text: string;
  translation: string;
}

interface categoryType {
  id: number;
}

export default function ManagerPage() {
  // // 스크립트 추가 버튼용 로직
  // function handleAddScript(index: number) {
  //   setScripts((prevScripts) => {
  //     const newScripts = [...prevScripts];
  //     newScripts.splice(index + 1, 0, {
  //       duration: 0,
  //       start: 0,
  //       text: "",
  //       translation: "",
  //       handleAddScript: handleAddScript,
  //     });

  //     console.log("추가 함수 실행됐다", newScripts);
  //     return newScripts;
  //   });
  // }

  const [inputs, setInputs] = useState({
    url: "",
    start: 0,
    end: 0,
    lang: "",
  });
  //Redux
  const { userId } = useSelector((state: RootState) => state.user);

  // 채워넣기 용 비디오 info
  const [videoInfo, setVideoInfo] = useState<getVideoInfoType>();
  const dispatch = useDispatch();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  interface scriptsType {
    duration: number | string;
    start: number | string;
    text: string;
    translation: string;
  }

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

  const [customTitle, setCustomTitle] = useState("");
  // 지정 커스텀 타이틀 값 변경
  const onChangeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTitle(e.target.value);
    console.log(customTitle);
  };

  useEffect(() => {}, [scripts]);

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

  // function convertToFloatOrKeep(value: any) {
  //   if (typeof value === "string") {
  //     return parseFloat(value);
  //   } else if (typeof value === "number") {
  //     return value;
  //   } else {
  //     return value; // 혹은 다른 처리를 수행하고자 하는 경우에 원하는 로직을 추가해주세요.
  //   }
  // }

  function handlePreviewButton() {
    makeFormData();
    openModal();
  }

  const userIdData = useSelector((state: RootState) => state.user.userId);
  const scriptsData = useSelector(
    (state: RootState) => state.scriptsPostInfo.scriptsList
  );

  function makeFormData() {
    const formData = new FormData();

    const video = {
      videoPath: videoInfo?.url,
      title: customTitle,
      thumbnail: videoInfo?.thumbnails,
      startTime: start,
      endTime: end,
      producer: videoInfo?.channelTitle,
      gender: gender,
      lang: lang,
    };

    if (scriptsData) {
      const postData = {
        video: video,
        userId: userId,
        scripts: scriptsData,
        categories: selectedTag,
      };

      console.log(`userId : ${userId}`);

      console.log("전송할 데이터", JSON.stringify(postData));

      formData.append("data", JSON.stringify(postData));

      if (audioFile) {
        formData.append(`file`, audioFile[0]);
      }

      return formData;
    }

    return formData;
  }

  async function saveDubVideo() {
    const formData = makeFormData();

    if (formData) {
      try {
        const videoPostResult = await mutation.mutateAsync(formData);
        // 스크립트 초기화
        dispatch(clearScriptsInfo());
      } catch (error) {}
    } else {
      console.log("formData가 존재하지 않습니다.");
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-24 font-bold mt-32 mb-16">더빙 콘텐츠 불러오기</p>
      <div className="flex space-x-32">
        <div>
          <label htmlFor="url">비디오 링크</label>
          <br />
          <input
            className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-400 border border-[#E9ECEF] pl-16 py-12"
            type="text"
            name="url"
            onChange={onChangeValue}
            value={url}
            placeholder="비디오 url을 입력하세요."
          />
        </div>
        <div>
          <label htmlFor="videoInterval">비디오 구간 설정</label>
          <br />
          <input
            className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-100 border border-[#E9ECEF] pl-16 py-12"
            type="number"
            name="start"
            onChange={onChangeValue}
            value={start}
            placeholder="시작 시간"
          />
          -
          <input
            className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-100 border border-[#E9ECEF] pl-16 py-12"
            type="number"
            name="end"
            onChange={onChangeValue}
            value={end}
            placeholder="종료 시간"
          />
        </div>
        <div>
          <label htmlFor="lang">콘텐츠 언어</label>
          <br />
          <div className="flex space-x-8 mt-10">
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
          className="rounded-[8px] bg-dubblue px-16 h-43 pb-0 text-white mt-23"
          onClick={handleGetVideoButton}
        >
          불러오기
        </button>
      </div>
      <p className="text-24 font-bold mt-32 mb-16">더빙 콘텐츠 정보</p>
      {videoInfo && (
        <div>
          <div>
            <p>콘텐츠 미리보기</p>
            <iframe
              src={getIframeUrl()}
              className="w-full aspect-video"
            ></iframe>
          </div>

          <div className="flex mt-16 grid grid-cols-2">
            <div>
              <p>썸네일</p>
              <img src={videoInfo!.thumbnails} alt="videoThumbnails" />
            </div>
            <div className="flex flex-col ml-16 justify-between">
              <div>
                <label htmlFor="videoTitle">콘텐츠 제목</label>
                <input
                  className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-full border border-[#E9ECEF] pl-16 py-12"
                  type="text"
                  defaultValue={videoInfo!.title}
                />
              </div>
              <div>
                <label htmlFor="videoRuntime">런타임</label>
                <br />
                <input
                  className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-100 border border-[#E9ECEF] pl-16 py-12"
                  type="number"
                  defaultValue={end - start}
                />
              </div>
              <div>
                <label htmlFor="videoProduction">제작사</label>
                <br />
                <input
                  className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-100 border border-[#E9ECEF] pl-16 py-12"
                  type="text"
                  defaultValue={videoInfo!.channelTitle}
                />
              </div>
            </div>
          </div>

          <p className="text-24 font-bold mt-32 mb-16">스크립트</p>
          {scripts.map((script, index) => (
            <ScriptListItem
              // index={index}
              start={script.start}
              duration={script.duration}
              text={script.text}
              translation={script.translation}
              key={index}
              // handleAddScript={handleAddScript}
            />
          ))}
        </div>
      )}

      <p className="text-24 font-bold mt-32 mb-16">콘텐츠 정보 입력하기</p>
      <div className="flex space-x-40">
        <div>
          <label htmlFor="videoTitle">콘텐츠 제목 지정</label>
          <br />
          <CommonInputBox
            type="text"
            name="videoTitle"
            value={customTitle}
            placeholder="콘텐츠 제목을 입력해주세요."
            onChange={onChangeTitleValue}
          />
        </div>

        <div>
          <label htmlFor="videoGender">더빙 성우 성별</label>
          <br />
          <div className="flex space-x-8 mt-8">
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
        </div>
      </div>

      <div className="mt-16">
        <p>카테고리</p>
        <div className="flex flex-wrap">
          {data?.map((tag: { id: number; name: string }, idx: number) => (
            <TagButton
              onClick={() => handleClickTag(tag.id)}
              id={tag.id}
              key={idx}
              name={tag.name}
              isSelected={selectedTag.includes(tag.id) ? true : false}
            />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <p>음성 파일 첨부</p>
        <p className="text-dubcoral">
          ⨀ mp3 파일명은 본인 id로 변경하여서 첨부해주세요.
        </p>
        <input
          type="file"
          name="file"
          id="uploadAudio"
          onChange={handleFileInput}
        />
      </div>
      <button
        className="rounded-[8px] bg-dubblue px-16 h-43 pb-0 text-white mt-23 mr-16"
        onClick={handleSaveVideoButton}
      >
        등록하기
      </button>
      <button
        className="rounded-[8px] bg-dubblue px-16 h-43 pb-0 text-white mt-23"
        onClick={handlePreviewButton}
      >
        확정된 스크립트 보기
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="미리보기 Modal"
      >
        {/* <button onClick={closeModal}>close</button> */}
        <div>
          {scriptsData &&
            scriptsData.map((item, index) => {
              return (
                <div className="m-16 text-dubblack" key={index}>
                  <h3>스크립트 {index + 1}</h3>
                  <p>content: {item.content}</p>
                  <p>translateContent: {item.translateContent}</p>
                  <p>startTime: {item.startTime}</p>
                  <p>duration: {item.duration}</p>
                  <p>isDub: {item.isDub}</p>
                  <p>-----------------------------------------</p>
                </div>
              );
            })}
        </div>
      </Modal>
    </div>
  );
}
