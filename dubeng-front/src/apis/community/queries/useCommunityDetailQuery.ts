import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = async (recordId: string) => {
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + `/dub/community/detail/${recordId}`,
    {
      params: {
        page: 0,
        size: 10,
      },
    }
  );

  // console.log('useCommunityDetailQuery', data);
  // console.log('content', data.content);

  return data.content;
};

const useCommunityDetailQuery = (recordId: string) => {
  return useQuery([queryKeys.COMMUNITY_DETAIL, recordId], () =>
    fetcher(recordId)
  );
};

export default useCommunityDetailQuery;
