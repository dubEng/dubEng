import * as queryKeys from "@/constants/queryKeys";
import { RootState } from "@/stores/store";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

const fetcher = (recordId: number) => {
  const userId = useSelector((state: RootState) => state.user.userId);
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL + `/dub/community/playCount/${recordId}`,
      {
        params: {
          userId: userId,
        },
      }
    )
    .then(({ data }) => {
      console.log("usePlayCountQuery안", data);
      return data;
    });
};
const usePlayCountUpQuery = (recordId: number) => {
  return useQuery([queryKeys.PLAY_COUNT], () => fetcher(recordId), {
    enabled: !!recordId,
  });
};

export default usePlayCountUpQuery;
