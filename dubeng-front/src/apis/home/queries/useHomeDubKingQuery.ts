import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";
import { getHomeDubKing } from "../api/home";

// const fetcher = () =>
//   axios
//     .get(process.env.NEXT_PUBLIC_BASE_URL + `/dub/home/dubking`)
//     .then(({ data }) => {
//       return data;
//     });

const useHomeDubKingQuery = (initialData: any) => {
  return useQuery([queryKeys.Home_DUB_KING], getHomeDubKing, {initialData: initialData});
};

export default useHomeDubKingQuery;
