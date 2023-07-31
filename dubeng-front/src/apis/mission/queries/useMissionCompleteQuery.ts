import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";

import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const fetcher = async (accessToken: string, videoId: number) => {
  axios.defaults.headers.common["Authorization"] = accessToken;
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + `/user/mission/complete`,
    {
      params: {
        videoId,
      },
    }
  );

  return data;
};

const useMissionCompleteQuery = (videoId: number) => {
  const { accessToken } = useSelector((state: RootState) => state.user);

  return useQuery([queryKeys.MISSION_COMPLETE, videoId], () =>
    fetcher(accessToken, videoId), {
      enabled: false,
    }
  );
};

export default useMissionCompleteQuery;
