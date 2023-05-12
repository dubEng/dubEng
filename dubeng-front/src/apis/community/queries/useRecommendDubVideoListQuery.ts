import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const fetcher = (langType: string) => {
  const userId = useSelector((state: RootState) => {
    return state.user.userId;
  });

  return axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `recommend/contents/${langType}`, {
      params: {
        userId: userId,
      },
    })
    .then((res) => {
      return res;
    });
};

const useRecommendDubVideoListQuery = (langType: string) => {
  return useQuery([queryKeys.RECOMMEND_DUB_VIDEO_LIST, langType], () =>
    fetcher(langType)
  );
};

export default useRecommendDubVideoListQuery;
