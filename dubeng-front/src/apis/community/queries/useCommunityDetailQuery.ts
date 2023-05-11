import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (recordId: string, langType : string) =>
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/dub/community/detail/${recordId}/${langType }`,
      {
        params: {
          page: 0,
          size: 10,
        },
      }
    )
    .then(({ data }) => {
      return data.content[0];
    });

const useCommunityDetailQuery = (recordId: string, langType : string) => {
  return useQuery([queryKeys.COMMUNITY_DETAIL, recordId, langType ], () =>
    fetcher(recordId, langType )
  );
};

export default useCommunityDetailQuery;
