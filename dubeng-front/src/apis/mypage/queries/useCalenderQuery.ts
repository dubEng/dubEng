import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const fetcher = async(accessToken: string, month: number) => {
  axios.defaults.headers.common["Authorization"] = accessToken;

  const {data} = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/user/mypage/attendance`, {params:{month: month}}
    );
    console.log('attendance :', data);
    
    return data;
};

const useCalenderQuery = (month : number) => {
  const {accessToken } = useSelector((state: RootState) => state.user);

  return useQuery(
    [queryKeys.CALENDAR_ATTENDANCE_LIST, accessToken, month],
    () => fetcher(accessToken, month)
  );
};

export default useCalenderQuery;
