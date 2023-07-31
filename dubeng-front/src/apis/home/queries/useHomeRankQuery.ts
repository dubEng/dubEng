import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";
import { getHomeRanking } from "../api/home";

// const fetcher = () =>
//   axios
//     .get(process.env.NEXT_PUBLIC_BASE_URL + `/dub/home/rank`)
//     .then(({ data }) => {
//       return data;
//     });

const useHomeRankQuery = (initialData: any) => {
  return useQuery([queryKeys.Home_RANK], getHomeRanking, {initialData: initialData});
};

export default useHomeRankQuery;
