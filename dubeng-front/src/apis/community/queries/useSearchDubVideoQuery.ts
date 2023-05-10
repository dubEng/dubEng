import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (
  contentsSearch: number[],
  langType: string,
  pageParam: string,
  size: string,
  title: string
) =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/contents/search/${langType}`, {
      params: {
        contentsSearch: contentsSearch,
        page: pageParam,
        size: size,
        title: title,
      },
    })
    .then(({ data }) => {
      return data;
    });

const useSearchDubVideoQuery = (
  contentsSearch: number[],
  langType: string,
  size: string,
  title: string
) => {
  return useQuery(
    [queryKeys.SEARCH_DUB_VIDEO, contentsSearch, langType, size, title],
    ({ pageParam = 0 }) =>
      fetcher(contentsSearch, langType, pageParam, size, title)
  );
};

export default useSearchDubVideoQuery;
