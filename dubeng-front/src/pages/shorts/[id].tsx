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

  const { data: presentContent } = useCommunityDetailQuery(recordId);
  const { data: nextContent, refetch } = useCommunityShortsQuery();

  const handleDragEnd = async (even: any, info: any) => {
    const { point } = info;
    const { y } = point;
    console.log("y ", y);

    if (y > 0) {
      // 페이지 전환을 위한 임계값 설정
      const nextRecord = await refetch();

      const nextRecordId =
        nextRecord.data[0].recordId == recordId
          ? nextRecord.data[1].recordId
          : nextRecord.data[0].recordId;
      router.push(`/shorts/${nextRecordId}`); // 원하는 대상 페이지 경로로 변경
    }
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
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
  );
}
