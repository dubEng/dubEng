import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";

const fetcher = (url: string, start: number, end: number, lang: string) =>
  axios
    .get("www" + `/admin/videoInfo`, {
      params: {
        url: url,
        start: start,
        end: end,
      },
    })
    .then(({ data }) => data);

const useGetVideoInfoQuery = (
  url: string,
  start: number,
  end: number,
  lang: string
) => {
  return useQuery(
    [queryKeys.VIDEO_INFO, url, start, end],
    () => fetcher(url, start, end, lang),
    { enabled: false }
  );
};

export default useGetVideoInfoQuery;
