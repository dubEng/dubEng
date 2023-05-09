import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (videoId: number) =>
  axios
    .get("https://k8b208.p.ssafy.io" + `/dub/record/${videoId}`)
    .then(({data}) => data);

const useDubRecordVideoInfoQuery = (videoId: number) => {
  return useQuery([queryKeys.DUB_RECORD_VIDEO_INFO, videoId], () => fetcher(videoId));
};

export default useDubRecordVideoInfoQuery;
