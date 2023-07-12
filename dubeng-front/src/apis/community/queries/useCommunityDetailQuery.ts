import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (recordId: string) =>
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/dub/community/detail/${recordId}?timestamp=${Date.now()}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    )
    .then(({ data }) => {
      return data;
    });

const useCommunityDetailQuery = (recordId: string) => {
  return useQuery([queryKeys.COMMUNITY_DETAIL, recordId], () =>
    fetcher(recordId)
  );
};

export default useCommunityDetailQuery;
