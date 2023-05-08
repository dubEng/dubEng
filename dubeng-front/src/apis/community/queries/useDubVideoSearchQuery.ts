import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (langType: string) =>
  axios
    .get("https://k8b208.p.ssafy.io/dub/contents" + `/recommand/${langType}`)
    .then(({ data }) => {
      return data;
    });

const useRecommendDubVideoQuery = (langType: string) => {
  return useQuery(queryKeys.RECOMMEND_DUV_VIDEO, () => fetcher(langType));
};

export default useRecommendDubVideoQuery;
