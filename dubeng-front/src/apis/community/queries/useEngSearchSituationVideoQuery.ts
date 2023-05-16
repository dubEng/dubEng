import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

import qs from "qs";

const fetcher = async (
  categoryId: null | number,
  langType: string,
  pageParam: number,
  size: number,
  title: null | string
) => {
  const queryArray = qs.stringify(
    { contentsSearch: [categoryId] },
    { arrayFormat: "repeat" }
  );
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL +
      `/dub/contents/search/${langType}` +
      `?${queryArray}`,
    {
      params: {
        page: pageParam,
        size: size,
        title: title,
      },
    }
  );

  return data;
};

const useEngSearchSituationVideoQuery = (
  categoryId: null | number,
  langType: string,
  size: number,
  title: string
) => {
  // const queryClient = useQueryClient();
  return useQuery(
    [queryKeys.SEARCH_SITUATION_VIDEO, categoryId],
    ({ pageParam = 0 }) =>
      fetcher(categoryId, langType, pageParam, size, title),
    { enabled: !!categoryId }
  );
};

export default useEngSearchSituationVideoQuery;
