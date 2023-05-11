import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (langType: string, videoId: string) =>
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/dub/contents/detail/${langType}/${videoId}`,
      {
        params: {
          page: 0,
          size: 10,
        },
      }
    )
    .then(({ data }) => {
      return data;
    });

const useContentsDetailQuery = (langType: string, videoId: string) => {
  return useQuery([queryKeys.CONTENTS_DETAIL, langType, videoId], () =>
    fetcher(langType, videoId)
  );
};

export default useContentsDetailQuery;
