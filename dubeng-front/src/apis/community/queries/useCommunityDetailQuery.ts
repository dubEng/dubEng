import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (recordId: string) =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/dub/community/detail/${recordId}`)
    .then(({ data }) => {
      return data;
    });

const useCommunityDetailQuery = (recordId: string) => {
  return useQuery([queryKeys.COMMUNITY_DETAIL, recordId], () =>
    fetcher(recordId)
  );
};

export default useCommunityDetailQuery;
