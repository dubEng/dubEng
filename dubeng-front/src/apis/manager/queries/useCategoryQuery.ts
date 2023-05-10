import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = () =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/admin/category`)
    .then(({ data }) => {
      return data;
    });

const useCategoryQuery = () => {
  return useQuery(queryKeys.CATEGORY, () => fetcher());
};

export default useCategoryQuery;
