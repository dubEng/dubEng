import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (langType: string) =>
  axios
    .get("https://k8b208.p.ssafy.io/dub/contents" + `/recommand/${langType}`, {
      params: {
        page: 0,
        size: 10,
      },
    })
    .then((res) => {
      return res;
    });

const useRecommendDubVideoListQuery = (langType: string) => {
  return useQuery([queryKeys.RECOMMEND_DUB_VIDEO_LIST, langType], () =>
    fetcher(langType)
  );
};

export default useRecommendDubVideoListQuery;
