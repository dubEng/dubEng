import * as queryKeys from "@/constants/queryKeys";
import axios from "axios";
import { useQuery } from "react-query";

const fetcher = (pageParam: string, recordId: number, size: string) =>
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL + `/dub/community/comment/${recordId}`,
      {
        params: {
          page: pageParam,
          size: size,
        },
      }
    )
    .then(({ data }) => {
      return data;
    });

const useCommentListQuery = (recordId: number, size: string) => {
  return useQuery([queryKeys.COMMENT_LIST], ({ pageParam = "0" }) =>
    fetcher(pageParam, recordId, size)
  );
};

export default useCommentListQuery;
