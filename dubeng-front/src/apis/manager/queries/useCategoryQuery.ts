import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = () =>
  axios.get("www" + `/category`).then(({ data }) => data.data);

const useCategoryQuery = () => {
  return useQuery(queryKeys.CATEGORY, () => fetcher());
};

export default useCategoryQuery;
