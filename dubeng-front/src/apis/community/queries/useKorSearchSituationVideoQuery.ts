import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = async (
  langType: string,
  pageParam: number,
  size: number,
  title: null | string
) => {
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + `/dub/contents/search/${langType}`,
    {
      params: {
        page: pageParam,
        size: size,
        title: title,
      },
    }
  );

  console.log("하이하이kordata:", data);
  return data;
};

const useSearchSituationVideoQuery = (
  langType: string,
  size: number,
  title: string
) => {
  return useQuery(
    [queryKeys.SEARCH_SITUATION_VIDEO, title],
    ({ pageParam = 0 }) => fetcher(langType, pageParam, size, title),
    { enabled: !!title }
  );
};

export default useSearchSituationVideoQuery;
