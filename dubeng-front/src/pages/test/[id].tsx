import useCommunityShortsQuery from "@/apis/community/queries/useCommunityShortsQuery";
import ShortsComponent from "@/features/community/organism/ShortsComponent";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
type IndexPageProps = {}
type IndexPageRef = React.ForwardedRef<HTMLDivElement>

export default function TestPage(props: IndexPageProps, ref: IndexPageRef) {
    const router = useRouter();

    const { data: contentList, refetch } = useCommunityShortsQuery();

    // 첫 렌더링에만 쇼츠콘텐츠 get 해오기
    useEffect(() => {
        refetch();
    }, []);

    function getRandomNumber(min: number, max: number) {
        // Math.random() 함수를 사용하여 0 이상 1 미만의 난수를 생성합니다.
        // 이를 min과 max 사이의 정수로 변환합니다.
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleDragEnd = async (even: any, info: any) => {
        const { point } = info;
        const { y } = point;
        console.log('y ', y);

        if (y > 0) {
            // 페이지 전환을 위한 임계값 설정
            router.push(`/test/${getRandomNumber(1, 100)}`); // 원하는 대상 페이지 경로로 변경
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
            className="absolute top-0 left-0 w-full h-full bg-orange-100"
        >
            {contentList &&
                <ShortsComponent videoPath={contentList[0].videoPath} userId={contentList[0].userId} title={contentList[0].title} recordCommentCount={contentList[0].recordCommentCount} profileImage={contentList[0].profileImage} nickname={contentList[0].nickname} startTime={contentList[0].startTime} endTime={contentList[0].endTime} createdDate={contentList[0].createdDate} audioPath={contentList[0].recordPath} />
            }
        </motion.div>
    );
}