import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (langType: string) =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/contents/recommand/${langType}`, {
      params: {
        page: 1,
        size: 10,
      },
    })
    .then((res) => {
      return res;
    });

const useRecommendDubVideoListQuery = (langType: string) => {
  return useQuery(queryKeys.RECOMMEND_DUV_VIDEO, () => fetcher(langType));
};

export default useRecommendDubVideoListQuery;
