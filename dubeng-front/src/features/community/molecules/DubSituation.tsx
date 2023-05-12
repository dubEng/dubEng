import DubSituationCard from "../atoms/DubSituationCard";
import { SituationType } from "../../../enum/statusType";
import { useState } from "react";
import DubVideoSlider from "../../../components/organism/DubVideoSlider";
import useSearchDubVideoQuery from "@/apis/community/queries/useSearchDubVideoQuery";
import useSearchSituationVideoQuery from "@/apis/community/queries/useSearchSituationVideoQuery";

export default function DubSituation() {
  const [isOpen, setOpen] = useState(false);
  const [situationId, setSituationId] = useState("");

  // const languageIndex = useSelector((state: RootState) => {
  //   return state.languageTab.langType;
  // });
  interface categoryType {
    [index: string]: number;
  }

  const categoryIdObject: categoryType = {
    PLACE_1: 18,
    PLACE_2: 21,
    COUNTRY: 35,
    EMOTION: 29,
  };

  // get용 react-query
  const { refetch } = useSearchSituationVideoQuery(
    [categoryIdObject[situationId]],
    "english",
    10,
    ""
  );

  async function getSituationVideo() {
    console.log("getSituationVideo로 들어옴");

    try {
      const { data: situationVideoList } = await refetch(); // console.log("!!!!!!!!!!!!!", refetch().data);
      console.log("situationVideoList", situationVideoList);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  }
  function handleSituationCard(id: string) {
    setSituationId(id);
    getSituationVideo();
  }

  return (
    <div className="w-358 grid gap-8 grid-cols-2">
      <button
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
      </button>
      {/* {situationVideoList && (
        <DubVideoSlider
          videoList={situationVideoList.content}
          isOpen={isOpen}
          setOpen={setOpen}
        />
      )} */}
    </div>
  );
}
