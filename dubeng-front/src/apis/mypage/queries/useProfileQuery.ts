import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const fetcher = (userId: string, accessToken: string) => {
  axios.defaults.headers.common["Authorization"] = accessToken;

  return axios
    .post(process.env.NEXT_PUBLIC_BASE_URL + `/user/mypage/profile`, {
      userId: userId,
    })
    .then(({ data }) => {
      console.log("profile", data);
      return data;
    });
};

const useProfileQuery = () => {
  const { userId, accessToken } = useSelector((state: RootState) => state.user);

  return useQuery([queryKeys.PROFILE, userId, accessToken], () =>
    fetcher(userId, accessToken)
  );
};

export default useProfileQuery;
