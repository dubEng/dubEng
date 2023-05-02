import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = () =>
  axios
    .get("https://k8b208.p.ssafy.io/admin" + `/category`)
    .then(({ data }) => {
      return data;
    });

const useCategoryQuery = () => {
  return useQuery(queryKeys.CATEGORY, () => fetcher());
};

export default useCategoryQuery;
