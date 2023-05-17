import * as queryKeys from "@/constants/queryKeys";
import { RootState } from "@/stores/store";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
interface IDataList {
  playCount: number;
  likeCount: number;
  like: boolean;
}
const fetcher = (videoId: number, userId: string) =>
  axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL + `/dub/contents/isScrap/${videoId}`,
      {
        params: {
          userId: userId,
        },
      }
    )
    .then(({ data }) => {
      console.log("isScrap", data);
      return data;
    });

const useScrapQuery = (videoId: number, userId: string) => {
  return useQuery([queryKeys.IS_SCRAP], () => fetcher(videoId, userId), {
    enabled: !!videoId,
  });
};

export default useScrapQuery;
