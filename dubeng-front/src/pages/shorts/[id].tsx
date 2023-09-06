import useCommunityDetailQuery from "@/apis/community/queries/useCommunityDetailQuery";
import useCommunityShortsQuery from "@/apis/community/queries/useCommunityShortsQuery";
import ShortsComponent from "@/features/community/organism/ShortsComponent";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type IndexPageProps = {};
type IndexPageRef = React.ForwardedRef<HTMLDivElement>;

export default function TestPage(props: IndexPageProps, ref: IndexPageRef) {
  const router = useRouter();
  const recordId = router.query.id as string;
  // const direction = router.query.direction as string;
  const [direction, setDirection] = useState<string | undefined>(undefined);
  console.log("query.direction", direction);

  const { data: presentContent } = useCommunityDetailQuery(recordId);
  const { data: nextContent, refetch } = useCommunityShortsQuery();

  const [variants, setVariants] = useState();

  useEffect(() => {
    console.log("useEffect 실행!!!");

    if (direction) {
      console.log("direction 바뀜!!!!");
      const handlePopstate = (e: any) => {
        if (e.state !== null) {
          console.log("direction UP~~~");
          setDirection("UP");
        }
      };

      window.addEventListener("popstate", handlePopstate);

      return () => {
        window.removeEventListener("popstate", handlePopstate);
      };
    }
  }, [direction]);

  useEffect(() => {
    if (router.query) {
      setDirection(router.query.direction as string);
      console.log("쿼리값 들어왔다!!");
    }
  }, [router.query]);

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
      // router.push({
      //   pathname: `/shorts/${nextRecordId}`,
      //   query: {
      //     direction: "UP",
      //   },
      // });

      router.back();

      console.log("아래에서 위로 ", y);
    } else {
      // 아래로 내려가기
      router.push({
        pathname: `/shorts/${nextRecordId}`,
        query: {
          direction: "DOWN",
        },
      });
      // 위에서 아래로 드래그 (선택 사항)
      console.log("위에서 아래로 ", y);
    }

    // if (y > 0) {
    //   // 페이지 전환을 위한 임계값 설정
    //   const nextRecord = await refetch();

    //   const nextRecordId =
    //     nextRecord.data[0].recordId == recordId
    //       ? nextRecord.data[1].recordId
    //       : nextRecord.data[0].recordId;
    //   router.push(`/shorts/${nextRecordId}`); // 원하는 대상 페이지 경로로 변경
    // }
  };

  return (
    <>
      {direction && direction === "UP" ? (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          variants={variants}
          transition={{ duration: 0.75, ease: "easeOut" }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          drag="y"
          className="absolute top-0 left-0 w-full h-full bg-black"
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
          variants={variants}
          transition={{ duration: 0.75, ease: "easeOut" }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          drag="y"
          className="absolute top-0 left-0 w-full h-full bg-black"
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
