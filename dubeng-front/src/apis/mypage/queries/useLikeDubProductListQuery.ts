import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const fetcher = async (isLimit: boolean, accessToken: string) => {
  axios.defaults.headers.common["Authorization"] = accessToken;

  const {data} = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + `/user/mypage/recordLikeList/${isLimit}`
  );

  console.log('useLikeDubProductListQuery', data);

  return data;
};

const useLikeDubProductListQuery = (isLimit: boolean) => {
  const { accessToken } = useSelector((state: RootState) => state.user);

  return useQuery([queryKeys.LIKE_DUB_PRODUCT_LIST, isLimit, accessToken], () =>
    fetcher(isLimit, accessToken)
  );
};

export default useLikeDubProductListQuery;
