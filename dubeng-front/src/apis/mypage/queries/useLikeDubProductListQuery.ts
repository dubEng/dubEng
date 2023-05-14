import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const fetcher = (isLimit: boolean, userId: string, accessToken: string) => {
  axios.defaults.headers.common["Authorization"] = accessToken;

  return axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/user/mypage/recordLikeList/${isLimit}`
    )
    .then(({ data }) => {
      console.log("likeDubList", data);
      return data;
    });
};

const useLikeDubProductListQuery = (isLimit: boolean) => {
  const { userId, accessToken } = useSelector((state: RootState) => state.user);

  return useQuery(
    [queryKeys.LIKE_DUB_PRODUCT_LIST, isLimit, userId, accessToken],
    () => fetcher(isLimit, userId, accessToken)
  );
};

export default useLikeDubProductListQuery;
