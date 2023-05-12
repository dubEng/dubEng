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
  console.log("queryArray", queryArray);
  return axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/dub/contents/search/${langType}` +
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
      console.log("더빙 비디오 쿼리 안!!!!", data);
      return data;
    });
};

const useSearchDubVideoQuery = (
  contentsSearch: number[],
  langType: string,
  size: number,
  title: string
) => {
  return useQuery(
    [queryKeys.SEARCH_DUB_VIDEO, contentsSearch, langType, size, title],
    ({ pageParam = 0 }) =>
      fetcher(contentsSearch, langType, pageParam, size, title)
  );
};

export default useSearchDubVideoQuery;
