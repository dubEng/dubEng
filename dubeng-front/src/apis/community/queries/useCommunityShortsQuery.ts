import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (page: number, size: number) =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/dub/community/shorts`,      {
      params: {
        page: page,
        size: size,
      },
    })
    .then(({ data }) => {
      return data.content;
    });

const useCommunityShortsQuery = (page: number, size: number) => {
  return useQuery([queryKeys.Shorts], () => fetcher(page, size));
};

export default useCommunityShortsQuery;
