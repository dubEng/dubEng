import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (videoId: string) =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/dub/contents/detail/${videoId}`)
    .then(({ data }) => {
      return data;
    });

const useContentsDetailQuery = (videoId: string) => {
  return useQuery([queryKeys.CONTENTS_DETAIL, videoId], () => fetcher(videoId));
};

export default useContentsDetailQuery;
