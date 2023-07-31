import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";

const fetcher = (url: string, start: number, end: number, lang: string) =>
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL + `/admin/videoInfo/${start}/${end}`,
      {
        params: {
          url: url,
          lang: lang,
        },
      }
    )
    .then(({ data }) => {
      return data;
    });

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
