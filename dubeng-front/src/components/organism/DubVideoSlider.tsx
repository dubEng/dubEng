import Sheet from "react-modal-sheet";
import DubVideoListItem from "../molecules/DubVideoListItem";

interface videoType {
  id: number;
  title: string;
  thumbnail: string;
  runtime: number;
}
interface Iprops {
  videoList: videoType[];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DubVideoSlider({ videoList, isOpen, setOpen }: Iprops) {
  function handleVideoListDiv() {
    setOpen(false);
  }
  // const dumpList = [
  //   {
  //     id: 160,
  //     title: "커리지 | 인사해요",
  //     thumbnail: "",
  //     runtime: 100,
  //   },
  //   {
  //     id: 161,
  //     title: "언도의 모험",
  //     thumbnail: "",
  //     runtime: 100,
  //   },
  //   {
  //     id: 162,
  //     title: "동동이의 세계일주",
  //     thumbnail: "",
  //     runtime: 100,
  //   },
  //   {
  //     id: 163,
  //     title: "아영이의 국내일주",
  //     thumbnail: "",
  //     runtime: 100,
  //   },
  //   {
  //     id: 171,
  //     title: "오! 완전 무대를 뒤집어 놓으셨다.",
  //     thumbnail: "",
  //     runtime: 100,
  //   },
  //   {
  //     id: 175,
  //     title: "[인턴] - 안하는 것보다 늦게 하는 것이 낫다",
  //     thumbnail: "",
  //     runtime: 100,
  //   },
  //   {
  //     id: 176,
  //     title: "[어바웃 타임] - 부모님 오시기 전",
  //     thumbnail: "",
  //     runtime: 100,
  //   },
  // ];

  return (
    <>
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="mx-16 h-full">
              <p className="flex justify-start text-19 font-bold mb-16">
                이 영상, 지금 더빙 어때요?
              </p>
              {videoList &&
                videoList.map((item, index) => (
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
