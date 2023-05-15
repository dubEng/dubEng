import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { Attendance } from "@/features/mypage/atoms/MyCalendar";

const fetcher = async(accessToken: string, month: number) => {
  axios.defaults.headers.common["Authorization"] = accessToken;

  const {data} = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/user/mypage/attendance`, {params:{month: month}}
    );
    return data;
};

const useCalenderQuery = (attendence : Attendance) => {
  const { accessToken } = useSelector((state: RootState) => state.user);

  return useQuery(
    [queryKeys.CALENDAR_ATTENDANCE_LIST, accessToken, attendence.month],
    () => fetcher(accessToken, attendence.month)
  );
};

export default useCalenderQuery;
