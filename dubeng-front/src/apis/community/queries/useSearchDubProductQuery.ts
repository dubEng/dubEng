import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

import qs from "qs";

const fetcher = (
  contentsSearch: number[],
  langType: string,
  pageParam: number,
  size: number,
  title: string
) => {
  const queryArray = qs.stringify(
    { contentsSearch: contentsSearch },
    { arrayFormat: "repeat" }
  );
  return axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/dub/community/search/${langType}` +
        `?${queryArray}`,
      {
        params: {
          // queryArray,
          page: pageParam,
          size: size,
          title: title,
        },
      }
    )
    .then(({ data }) => {
      return data;
    });
};

const useSearchDubProductQuery = (
  contentsSearch: number[],
  langType: string,
  size: number,
  title: string
) => {
  return useQuery(
    [queryKeys.SEARCH_DUB_PRODUCT, contentsSearch, langType, size, title],
    ({ pageParam = 0 }) =>
      fetcher(contentsSearch, langType, pageParam, size, title)
  );
};

export default useSearchDubProductQuery;
