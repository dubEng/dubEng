import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (videoId: number) =>
  axios
    .get("https://k8b208.p.ssafy.io" + `/dub/record/script/${videoId}`)
    .then(({data}) => data);

const useDubRecordScriptQuery = (videoId: number) => {
  return useQuery([queryKeys.DUB_RECORD_SCRIPT, videoId], () => fetcher(videoId));
};

export default useDubRecordScriptQuery;
