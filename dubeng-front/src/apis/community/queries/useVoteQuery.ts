import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (langType: string, userId: string) =>
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL + `/dub/community/dubking/${langType}`,
      {
        params: {
          userId: userId,
        },
      }
    )
    .then(({ data }) => {
      return data;
    });

const useVoteQuery = (langType: string, userId: string) => {
  return useQuery(
    [queryKeys.VOTE, langType, userId],
    () => fetcher(langType, userId),
    { enabled: false }
  );
};

export default useVoteQuery;
