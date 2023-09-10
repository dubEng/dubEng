import useCommunityDetailQuery from "@/apis/community/queries/useCommunityDetailQuery";
import useCommunityShortsQuery from "@/apis/community/queries/useCommunityShortsQuery";
import ShortsComponent from "@/features/community/organism/ShortsComponent";
import { setDir, setRecordIdList } from "@/stores/community/shortsSlice";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { Direct } from "@/enum/statusType";

type IndexPageProps = {};
type IndexPageRef = React.ForwardedRef<HTMLDivElement>;

export default function TestPage(props: IndexPageProps, ref: IndexPageRef) {
  const router = useRouter();
  const recordId = router.query.id as string;

  const dispatch = useDispatch();
  const { dir, recordIdList } = useSelector((state: RootState) => state.shorts);
  console.log("recordIdList", recordIdList);

  const { data: presentContent } = useCommunityDetailQuery(recordId);
  const { data: nextContent, refetch } = useCommunityShortsQuery();

  const index = parseInt(router.query.index as string);

  // useEffect(() => {
  //   console.log("useEffect 실행!!!");

  //   if (direction) {
  //     console.log("direction 바뀜!!!!");
  //     const handlePopstate = (e: any) => {
  //       if (e.state !== null) {
  //         console.log("direction UP~~~");
  //         setDirection("UP");
  //       }
  //     };

  //     window.addEventListener("popstate", handlePopstate);

  //     return () => {
  //       window.removeEventListener("popstate", handlePopstate);
  //     };
  //   }
  // }, [direction]);

  useEffect(() => {
    if (dir === Direct.DOWN && index === recordIdList.length) {
      dispatch(setRecordIdList(recordId));
    }
  }, []);

  let startY = 0; // 드래그 시작 지점의 Y 좌표를 저장

  const handleDragStart = (event: any, info: any) => {
    const { point } = info;
    startY = point.y; // 드래그 시작 시 Y 좌표 저장
  };

  const handleDragEnd = async (even: any, info: any) => {
    const { point } = info;
    const { y } = point;

    const endY = point.y; // 드래그 종료 시 Y 좌표 저장
    const dragDistance = endY - startY; // 드래그 거리 계산

    //   // 페이지 전환을 위한 임계값 설정
    const nextRecord = await refetch();

    const nextRecordId =
      nextRecord.data[0].recordId == recordId
        ? nextRecord.data[1].recordId
        : nextRecord.data[0].recordId;

    if (dragDistance > 0) {
      // 위로 거슬러 올라가기
      console.log("recordIdList.length", recordIdList.length);

      if (index !== 0) {
        dispatch(setDir(Direct.UP));
        router.push({
          pathname: `/shorts/${recordIdList[index - 1]}`,
          query: {
            index: index - 1,
          },
        });
      } else {
        router.push("/");
      }
    } else {
      // 아래로 내려가기
      dispatch(setDir(Direct.DOWN));

      console.log("recordIdList.length", recordIdList.length);

      if (index === recordIdList.length - 1) {
        // recordIdList의 끝이라 새로 콘텐츠 불러와야 할 때
        router.push({
          pathname: `/shorts/${nextRecordId}`,
          query: {
            index: index + 1,
          },
        });
      } else {
        // history에 있는 다음 걸로 하면 될 때
        router.push({
          pathname: `/shorts/${recordIdList[index + 1]}`,
          query: {
            index: index + 1,
          },
        });
      }
    }
  };

  return (
    <>
      {dir && dir === Direct.UP ? (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          drag="y"
          className="absolute top-0 left-0 w-full h-full"
        >
          {presentContent && (
            <ShortsComponent
              videoPath={presentContent.videoPath}
              userId={presentContent.userId}
              title={presentContent.title}
              recordCommentCount={presentContent.recordCommentCount}
              profileImage={presentContent.profileImage}
              nickname={presentContent.nickname}
              startTime={presentContent.startTime}
              endTime={presentContent.endTime}
              createdDate={presentContent.createdDate}
              audioPath={presentContent.recordPath}
            />
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          drag="y"
          className="absolute top-0 left-0 w-full h-full"
        >
          {presentContent && (
            <ShortsComponent
              videoPath={presentContent.videoPath}
              userId={presentContent.userId}
              title={presentContent.title}
              recordCommentCount={presentContent.recordCommentCount}
              profileImage={presentContent.profileImage}
              nickname={presentContent.nickname}
              startTime={presentContent.startTime}
              endTime={presentContent.endTime}
              createdDate={presentContent.createdDate}
              audioPath={presentContent.recordPath}
            />
          )}
        </motion.div>
      )}
    </>
  );
}
