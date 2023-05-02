import Sheet from "react-modal-sheet";
import DubVideoListItem from "../molecules/DubVideoListItem";

interface Iprops {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DubVideoSlider({ isOpen, setOpen }: Iprops) {
  const dumpList = [
    {
      title: "커리지 | 인사해요",
      thumbnail: "",
      runtime: "2분 3초",
    },
    {
      title: "언도의 모험",
      thumbnail: "",
      runtime: "2분 2초",
    },
    {
      title: "동동이의 세계일주",
      thumbnail: "",
      runtime: "2분 1초",
    },
    {
      title: "아영이의 국내일주",
      thumbnail: "",
      runtime: "2분 15초",
    },
    {
      title: "지희의 CA 체험기",
      thumbnail: "",
      runtime: "2분 2초",
    },
    {
      title: "자민이의 안산 정벌",
      thumbnail: "",
      runtime: "2분 3초",
    },
  ];

  return (
    <>
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <p className="flex justify-start mx-16 text-19 font-bold mb-16">
              이 영상, 지금 더빙 어때요?
            </p>
            {dumpList &&
              dumpList.map((item, index) => (
                <div className="mb-16" key={index}>
                  <DubVideoListItem
                    title={item.title}
                    thumbnail={item.thumbnail}
                    runtime={item.runtime}
                    key={index}
                  />
                </div>
              ))}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
