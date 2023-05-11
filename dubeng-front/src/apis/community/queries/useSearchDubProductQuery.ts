import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

import qs from "qs";

const fetcher = (
  contentsSearch: number[],
  langType: string,
  pageParam: string,
  size: string,
  title: string
) => {
  const queryArray = qs.stringify(contentsSearch, { arrayFormat: "repeat" });
  return axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL + `/dub/community/search/${langType}`,
      {
        params: {
          queryArray,
          page: pageParam,
          size: size,
          title: title,
        },
      }
    )
    .then(({ data }) => {
      console.log("{ 작품search쿼리data }확인", data);
      return data;
    });
};

const useSearchDubProductQuery = (
  contentsSearch: number[],
  langType: string,
  size: string,
  title: string
) => {
  return useQuery(
    [queryKeys.SEARCH_DUB_PRODUCT, contentsSearch, langType, size, title],
    ({ pageParam = "0" }) =>
      fetcher(contentsSearch, langType, pageParam, size, title)
  );
};

export default useSearchDubProductQuery;
