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
  const queryArray = qs.stringify(contentsSearch, { arrayFormat: "repeat" });
  return axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL + `/dub/contents/search/${langType}`,
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
      console.log("상황 비디오 쿼리 안!!!!", data);
      return data;
    });
};

const useSearchSituationVideoQuery = (
  contentsSearch: number[],
  langType: string,
  size: number,
  title: string
) => {
  console.log("useSearchSituation 안", contentsSearch);
  return useQuery(
    [queryKeys.SEARCH_SITUATION_VIDEO, contentsSearch[0]],
    ({ pageParam = 0 }) =>
      fetcher(contentsSearch, langType, pageParam, size, title),
    { enabled: false }
  );
};

export default useSearchSituationVideoQuery;
