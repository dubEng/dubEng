import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (recordId: number, userId: string) => {
  return axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL + `/dub/community/playCount/${recordId}`,
      {
        params: {
          userId: userId,
        },
      }
    )
    .then(({ data }) => {
      console.log("like info data 잘 넘어옴", data);
      return data;
    });
};

const useLikeInfoQuery = (recordId: number, userId: string) => {
  return useQuery([queryKeys.LIKE_INFO], () => fetcher(recordId, userId), {});
};

export default useLikeInfoQuery;
