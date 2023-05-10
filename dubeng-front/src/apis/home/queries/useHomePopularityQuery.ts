import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";

const fetcher = () =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/home/popularity`)
    .then(({ data }) => {
      return data;
    });

const useHomePopularityQuery = () => {
  return useQuery([queryKeys.Home_POPULARITY], () => fetcher());
};

export default useHomePopularityQuery;
