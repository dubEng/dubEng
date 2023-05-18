import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";

import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const fetcher = async (accessToken: string, videoId: number) => {
  console.log('useMissionCompleteQuery fetcher');

  axios.defaults.headers.common["Authorization"] = accessToken;
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + `/user/mission/complete`,
    {
      params: {
        videoId,
      },
    }
  );
  console.log("useMissionCompleteQuery", data);

  return data;
};

const useMissionCompleteQuery = (videoId: number) => {
  const { accessToken } = useSelector((state: RootState) => state.user);

  return useQuery([queryKeys.MISSION_COMPLETE, videoId], () =>
    fetcher(accessToken, videoId), {
      enabled: false,
      onSuccess: data => {
        // 성공시 호출
        console.log("useMissionCompleteQuery response", data);
        alert("도전과제 호출 성공");
      },
    }
  );
};

export default useMissionCompleteQuery;
