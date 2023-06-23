import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";
import { getHomePopularity } from "../api/home";

// const fetcher = () =>
//   axios
//     .get(process.env.NEXT_PUBLIC_BASE_URL + `/dub/home/popularity`)
//     .then(({ data }) => {
//       return data;
//     });

const useHomePopularityQuery = (initialData: any) => {
  return useQuery([queryKeys.Home_POPULARITY], getHomePopularity, {initialData: initialData});
};

export default useHomePopularityQuery;
