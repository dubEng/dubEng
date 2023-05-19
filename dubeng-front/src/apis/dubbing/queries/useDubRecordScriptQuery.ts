import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (videoId: number) =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/dub/record/script/${videoId}`)
    .then(({data}) => data);

const useDubRecordScriptQuery = (videoId: number) => {
  return useQuery([queryKeys.DUB_RECORD_SCRIPT, videoId], () => fetcher(videoId));
};

export default useDubRecordScriptQuery;
