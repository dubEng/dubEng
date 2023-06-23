import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const fetcher = async (isLimit: boolean, accessToken: string, langType: string) => {
  axios.defaults.headers.common["Authorization"] = accessToken;

  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + `/user/mypage/record/likes/`,
    {
      params: {
        isLimit,
        langType
      },
    }
  );

  console.log('useLikeDubProductListQuery', useLikeDubProductListQuery);

  return data;
};

const useLikeDubProductListQuery = (isLimit: boolean, langType: string) => {
  const { accessToken } = useSelector((state: RootState) => state.user);

  return useQuery([queryKeys.LIKE_DUB_PRODUCT_LIST, isLimit, accessToken], () =>
    fetcher(isLimit, accessToken, langType)
  );
};

export default useLikeDubProductListQuery;
