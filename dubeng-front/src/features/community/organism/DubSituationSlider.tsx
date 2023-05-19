import Sheet from "react-modal-sheet";

import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useRecommendDubVideoListQuery from "@/apis/community/queries/useRecommendDubVideoListQuery";
import ErrorComponent from "@/components/atoms/ErrorComponent";
import DubVideoListItem from "@/components/molecules/DubVideoListItem";

interface videoType {
  id: number;
  title: string;
  thumbnail: string;
  runtime: number;
}
interface Iprops {
  title: string;
  videoList: videoType[];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DubSituationSlider({
  title,
  videoList,
  isOpen,
  setOpen,
}: Iprops) {
  // const [isOpen, setOpen] = useState(false);
  function handleVideoListDiv() {
    setOpen(false);
  }

  return (
    <>
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="mx-16 h-full">
              <p className="flex justify-start text-19 font-bold mb-16">
                {title}
              </p>
              {videoList &&
                videoList.map((item: any, index: number) => (
                  <div
                    className="mb-16"
                    key={index}
                    onClick={handleVideoListDiv}
                  >
                    <DubVideoListItem
                      id={item.id}
                      title={item.title}
                      thumbnail={item.thumbnail}
                      runtime={item.runtime}
                      key={index}
                    />
                  </div>
                ))}
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
