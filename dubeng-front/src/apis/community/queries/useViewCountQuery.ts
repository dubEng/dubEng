import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import axios from "axios";

const fetcher = (recordId: number) => {
  return axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL + `/dub/community/viewCount/${recordId}`
    )
    .then((res) => {
      console.log("view count res", res);
    });
};

const useViewCountQuery = (recordId: number) => {
  return useQuery(queryKeys.VIEW_COUNT, () => fetcher(recordId), {});
};

export default useViewCountQuery;
