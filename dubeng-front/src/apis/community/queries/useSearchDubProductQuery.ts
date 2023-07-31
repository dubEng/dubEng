import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

import qs from "qs";

const fetcher = (
  contentsSearch: number[],
  langType: string,
  size: number,
  page: number,
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
          page: page,
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
  page: number,
  title: string
) => {
  return useQuery(
    [queryKeys.SEARCH_DUB_PRODUCT, contentsSearch, langType, size, page, title],
    () => fetcher(contentsSearch, langType, size, page, title)
  );
};

export default useSearchDubProductQuery;
