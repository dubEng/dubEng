import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (videoId: string) =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/dub/contents/detail/${videoId}`, {
      params: {
        page: 0,
        size: 10,
      },
    })
    .then(({ data }) => {
      return data.content[0];
    });

const useContentsDetailQuery = (videoId: string) => {
  return useQuery([queryKeys.CONTENTS_DETAIL, videoId], () => fetcher(videoId));
};

export default useContentsDetailQuery;
