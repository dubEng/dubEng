import DubSituationCard from "../atoms/DubSituationCard";
import { SituationType } from "../../../enum/statusType";
import { useState } from "react";
import DubVideoSlider from "../../../components/organism/DubVideoSlider";
import useSearchDubVideoQuery from "@/apis/community/queries/useSearchDubVideoQuery";
import useSearchSituationVideoQuery from "@/apis/community/queries/useSearchSituationVideoQuery";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useQueryClient } from "react-query";
import DubSituationSlider from "../organism/DubSituationSlider";

export default function DubSituation() {
  const queryClient = useQueryClient();
  const MySwal = withReactContent(Swal);

  const [isOpen, setOpen] = useState(false);
  const [situationId, setSituationId] = useState<null | number>(null);
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
  const { data: situationVideoList } = useSearchSituationVideoQuery(
    situationId,
    languageIndex,
    10,
    ""
  );

  console.log("확인!!!!!!!1111", situationVideoList);

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
    console.log("1번 카드 클릭");
    setSituationId(18);
    setOpen(true);
    setSliderTitle("식당에서");
  }
  function handleSituationCard2() {
    setSituationId(21);
    setOpen(true);
    setSliderTitle("회사에서");
  }
  function handleSituationCard3() {
    setSituationId(35);
    setOpen(true);
    setSliderTitle("미국 America");
  }
  function handleSituationCard4() {
    setSituationId(29);
    setOpen(true);
    setSliderTitle("#기쁨");
  }

  return (
    <div className="w-358 grid gap-8 grid-cols-2">
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
        <DubSituationCard type={SituationType.PLACE_1} />
      </button>
      <button id="21" onClick={handleSituationCard2}>
        <DubSituationCard type={SituationType.PLACE_2} />
      </button>
      <button id="35" onClick={handleSituationCard3}>
        <DubSituationCard type={SituationType.COUNTRY} />
      </button>
      <button id="{SituationType.EMOTION}" onClick={handleSituationCard4}>
        <DubSituationCard type={SituationType.EMOTION} />
      </button>
      {situationVideoList && (
        <DubSituationSlider
          title={sliderTitle}
          videoList={situationVideoList.content}
          isOpen={isOpen}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}
