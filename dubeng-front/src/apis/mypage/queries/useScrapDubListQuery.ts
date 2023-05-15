import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const fetcher = async (isLimit: boolean, accessToken: string) => {
  axios.defaults.headers.common["Authorization"] = accessToken;

  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + `/user/mypage/bookmark/${isLimit}`
  );

  console.log('useScrapDubVideoListQuery', data);
  return data;
};

const useScrapDubVideoListQuery = (isLimit: boolean) => {
  const { accessToken } = useSelector((state: RootState) => state.user);

  return useQuery([queryKeys.SCRAP_DUB_VIDEO_LIST, isLimit, accessToken], () =>
    fetcher(isLimit, accessToken)
  );
};

export default useScrapDubVideoListQuery;
