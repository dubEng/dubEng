import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";

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
  console.log(data);

  return data;
};

const useMissionCompleteQuery = (accessToken: string, videoId: number) => {
  return useQuery([queryKeys.MISSION_COMPLETE, videoId], () =>
    fetcher(accessToken, videoId)
  );
};

export default useMissionCompleteQuery;
