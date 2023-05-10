import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";

const fetcher = () =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/home/rank`)
    .then(({ data }) => {
      return data;
    });

const useHomeRankQuery = () => {
  return useQuery([queryKeys.Home_RANK], () => fetcher());
};

export default useHomeRankQuery;
