import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";

const fetcher = (videoId: number, userId: string) =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/dub/record/${videoId}`, {
      params: {
        userId,
      },
    })
    .then(({ data }) => data);

const useDubRecordVideoInfoQuery = (videoId: number) => {
  const userId = useSelector((state: RootState) => state.user.userId);

  return useQuery([queryKeys.DUB_RECORD_VIDEO_INFO, videoId, userId], () =>
    fetcher(videoId, userId)
  );
};

export default useDubRecordVideoInfoQuery;
