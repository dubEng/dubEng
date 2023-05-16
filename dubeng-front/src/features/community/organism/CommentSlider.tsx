import useCommentListQuery from "@/apis/community/queries/useCommentListQuery";
import ErrorComponent from "@/components/atoms/ErrorComponent";
import { useRouter } from "next/router";
import Sheet from "react-modal-sheet";
import CommentListItem from "../molecules/CommentListItem";
import EmptyComponent from "@/components/atoms/EmptyComponent";
import { EmptyType } from "@/enum/statusType";
interface Iprops {
  isCommentSliderOpen: boolean;
  setIsCommentSliderOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentSlider({
  isCommentSliderOpen,
  setIsCommentSliderOpen,
}: Iprops) {
  const router = useRouter();
  const recordId = Number(router.query.id);
  console.log("recordId 확인하기!~!~", recordId, typeof recordId);

  const { data, isLoading, isError, refetch } = useCommentListQuery(
    recordId,
    "10"
  );

  // const data = {
  //   content: [
  //     {
  //       content:
  //         "안녕하세요안녕하세요안녕하세세요안녕하세요안녕하세요안녕하세요",
  //       nickName: "언도더씨",
  //       updatedDate: "2023-05-15T16:53:47.323Z",
  //       userId: "12",
  //     },
  //     {
  //       content:
  //         "안녕하세요안녕하세요안녕하세세요안녕하세요안녕하세요안녕하세요",
  //       nickName: "언도더씨",
  //       updatedDate: "2023-05-15T16:53:47.323Z",
  //       userId: "12",
  //     },
  //     {
  //       content:
  //         "안녕하세요안녕하세요안녕하세세요안녕하세요안녕하세요안녕하세요",
  //       nickName: "언도더씨",
  //       updatedDate: "2023-05-15T16:53:47.323Z",
  //       userId: "12",
  //     },
  //     {
  //       content:
  //         "안녕하세요안녕하세요안녕하세세요안녕하세요안녕하세요안녕하세요",
  //       nickName: "언도더씨",
  //       updatedDate: "2023-05-15T16:53:47.323Z",
  //       userId: "12",
  //     },
  //     {
  //       content:
  //         "안녕하세요안녕하세요안녕하세세요안녕하세요안녕하세요안녕하세요",
  //       nickName: "언도더씨",
  //       updatedDate: "2023-05-15T16:53:47.323Z",
  //       userId: "12",
  //     },
  //   ],
  //   empty: true,
  //   first: true,
  //   last: true,
  //   number: 0,
  //   numberOfElements: 0,
  //   pageable: {
  //     page: "string",
  //     size: "string",
  //   },
  //   size: 0,
  //   sort: {
  //     empty: true,
  //     sorted: true,
  //     unsorted: true,
  //   },
  //   totalElements: 0,
  //   totalPages: 0,
  // };

  return (
    <>
      <Sheet
        isOpen={isCommentSliderOpen}
        onClose={() => setIsCommentSliderOpen(false)}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            {isLoading ? (
              <div className="flex justify-center items-center my-16">
                {/* <ScaleLoader color="#FF6D60" /> */}
                {"로딩 중입니다"}
              </div>
            ) : isError ? (
              <ErrorComponent onClick={() => refetch} retry={true} />
            ) : (
              <div className="mx-24 h-full">
                <div className="flex items-centers">
                  <p className="text-19 font-bold mb-16">댓글</p>
                  <p className="text-14 text-dubgray mt-2 ml-4">
                    {data?.number}
                  </p>
                </div>
                {data?.content.length === 0 && (
                  <div className="justify-center my-400">
                    <EmptyComponent status={EmptyType.EMPTY_COMMENT} />
                  </div>
                )}
                {data?.content &&
                  data?.content.map((item: any, index: number) => (
                    <div className="mb-32 w-full" key={index}>
                      <CommentListItem
                        userId={item.userId}
                        nickName={item.nickName}
                        userImage={item.hi}
                        content={item.content}
                        updatedDate={item.updatedDate}
                      />
                    </div>
                  ))}
              </div>
            )}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
