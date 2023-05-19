import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = () =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/dub/community/shorts`, {
      params: {
        page: 0,
        size: 5,
      },
    })
    .then(({ data }) => {
      return data.content;
    });

const useCommunityShortsQuery = () => {
  return useQuery([queryKeys.Shorts], fetcher, {
    enabled: false
  });
};

export default useCommunityShortsQuery;
