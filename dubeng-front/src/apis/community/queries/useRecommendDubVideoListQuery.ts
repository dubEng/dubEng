import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const fetcher = (langType: string, userId: string, accessToken: string) => {
  axios.defaults.headers.common["Authorization"] = accessToken;

  return axios
    .post(process.env.NEXT_PUBLIC_BASE_URL + `/recommend/contents`, {
      userId: userId,
    })
    .then((res) => {
      return res;
    });
};

const useRecommendDubVideoListQuery = (langType: string) => {
  const { userId, accessToken } = useSelector((state: RootState) => state.user);

  return useQuery(
    [queryKeys.RECOMMEND_DUB_VIDEO_LIST, langType, userId, accessToken],
    () => fetcher(langType, userId, accessToken)
  );
};

export default useRecommendDubVideoListQuery;
