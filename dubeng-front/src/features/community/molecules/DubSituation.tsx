import DubSituationCard from "../atoms/DubSituationCard";
import { LangType, SituationType } from "../../../enum/statusType";
import { useState } from "react";
import DubVideoSlider from "../../../components/organism/DubVideoSlider";
import useSearchDubVideoQuery from "@/apis/community/queries/useSearchDubVideoQuery";
import useSearchSituationVideoQuery from "@/apis/community/queries/useEngSearchSituationVideoQuery";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useQueryClient } from "react-query";
import DubSituationSlider from "../organism/DubSituationSlider";
import useEngSearchSituationVideoQuery from "@/apis/community/queries/useEngSearchSituationVideoQuery";
import useKorSearchSituationVideoQuery from "@/apis/community/queries/useKorSearchSituationVideoQuery";

export default function DubSituation() {
  const queryClient = useQueryClient();
  const MySwal = withReactContent(Swal);

  const [isOpen, setOpen] = useState(false);

  const [situationId, setSituationId] = useState<null | number>(null);
  const [situationTitle, setSituationTitle] = useState<string>("");

  const [sliderTitle, setSliderTitle] = useState("");

  const languageIndex = useSelector((state: RootState) => {
    return state.languageTab.langType;
  });
  // interface categoryType {
  //   [index: string]: number;
  // }

  // const categoryIdObject: categoryType = {
  //   PLACE_1: 18,
  //   PLACE_2: 21,
  //   COUNTRY: 35,
  //   EMOTION: 29,
  // };

  // get용 react-query
  // const { refetch } = useSearchSituationVideoQuery(
  //   [categoryIdObject[situationId]],
  //   "english",
  //   10,
  //   ""
  // );

  // get 쿼리 요청
  const { data: situationVideoList } = useEngSearchSituationVideoQuery(
    situationId,
    languageIndex,
    10,
    ""
  );
  const { data: situationKorVideoList } = useKorSearchSituationVideoQuery(
    languageIndex,
    10,
    situationTitle
  );

  // function getSituationVideo() {
  //   console.log("getSituationVideo로 들어옴");
  //   const situationVideoList = useSearchDubVideoQuery(
  //     [categoryIdObject[situationId]],
  //     "english",
  //     10,
  //     ""
  //   );
  //   // try {
  //   //   const response = await refetch(); // console.log("!!!!!!!!!!!!!", refetch().data);

  //   //   console.log("response", response);
  //   //   setOpen(true);
  //   //   console.log("셋 오픈 true 됨");
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // }

  function handleSituationCard1() {
    if (languageIndex === LangType.ENGLISH) {
      setSituationId(18);
      setSliderTitle("식당에서");
    } else {
      setSituationTitle("하이킥");
      setSliderTitle("하이킥 시리즈");
    }
    setOpen(true);
  }
  function handleSituationCard2() {
    if (languageIndex === LangType.ENGLISH) {
      setSituationId(21);
      setSliderTitle("회사에서");
    } else {
      setSituationTitle("무한도전");
      setSliderTitle("무한도전 시리즈");
    }
    setOpen(true);
  }
  function handleSituationCard3() {
    if (languageIndex === LangType.ENGLISH) {
      setSituationId(35);
      setSliderTitle("미국 America");
    } else {
      setSituationTitle("재벌집 막내아들");
      setSliderTitle("재벌집 막내아들은 바로 나");
    }
    setOpen(true);
  }
  function handleSituationCard4() {
    if (languageIndex === LangType.ENGLISH) {
      setSituationId(29);
      setSliderTitle("#기쁨");
    } else {
      setSituationTitle("더글로리");
      setSliderTitle("더글로리 따라잡기");
    }
    setOpen(true);
  }

  return (
    <div className="w-full grid gap-8 grid-cols-2">
      {/* <button
        id={SituationType.PLACE_1}
        onClick={() => handleSituationCard(SituationType.PLACE_1)}
      >
        <DubSituationCard type={SituationType.PLACE_1} />
      </button>
      <button
        id={SituationType.PLACE_2}
        onClick={() => handleSituationCard(SituationType.PLACE_2)}
      >
        <DubSituationCard type={SituationType.PLACE_2} />
      </button>
      <button
        id={SituationType.COUNTRY}
        onClick={() => handleSituationCard(SituationType.COUNTRY)}
      >
        <DubSituationCard type={SituationType.COUNTRY} />
      </button>
      <button
        id={SituationType.EMOTION}
        onClick={() => handleSituationCard(SituationType.EMOTION)}
      >
        <DubSituationCard type={SituationType.EMOTION} />
      </button> */}
      <button id="18" onClick={handleSituationCard1}>
        <DubSituationCard
          type={SituationType.PLACE_1}
          langType={languageIndex}
        />
      </button>
      <button id="21" onClick={handleSituationCard2}>
        <DubSituationCard
          type={SituationType.PLACE_2}
          langType={languageIndex}
        />
      </button>
      <button id="35" onClick={handleSituationCard3}>
        <DubSituationCard
          type={SituationType.COUNTRY}
          langType={languageIndex}
        />
      </button>
      <button id="{SituationType.EMOTION}" onClick={handleSituationCard4}>
        <DubSituationCard
          type={SituationType.EMOTION}
          langType={languageIndex}
        />
      </button>
      {languageIndex === LangType.ENGLISH
        ? situationVideoList && (
            <DubSituationSlider
              title={sliderTitle}
              videoList={situationVideoList.content}
              isOpen={isOpen}
              setOpen={setOpen}
            />
          )
        : situationKorVideoList && (
            <DubSituationSlider
              title={sliderTitle}
              videoList={situationKorVideoList.content}
              isOpen={isOpen}
              setOpen={setOpen}
            />
          )}
    </div>
  );
}
