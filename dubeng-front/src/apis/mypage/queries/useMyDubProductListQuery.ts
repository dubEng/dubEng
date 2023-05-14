import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const fetcher = (
  isPublic: boolean,
  isLimit: boolean,
  lanType: string,
  userId: string,
  accessToken: string
) => {
  axios.defaults.headers.common["Authorization"] = accessToken;

  return axios
    .post(process.env.NEXT_PUBLIC_BASE_URL + `/user/mypage/recordList`, {
      isPublic: isPublic,
      isLimit: isLimit,
      lanType: lanType,
    })
    .then(({ data }) => {
      console.log("mydubproductlist", data);
      return data;
    });
};

const useMyDubProductListQuery = (
  isPublic: boolean,
  isLimit: boolean,
  lanType: string
) => {
  const { userId, accessToken } = useSelector((state: RootState) => state.user);

  return useQuery(
    [
      queryKeys.MY_DUB_PRODUCT_LIST,
      isPublic,
      isLimit,
      lanType,
      userId,
      accessToken,
    ],
    () => fetcher(isPublic, isLimit, lanType, userId, accessToken)
  );
};

export default useMyDubProductListQuery;
