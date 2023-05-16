import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import * as queryKeys from "@/constants/queryKeys";

// const config = {
//   headers: { "Content-Type": "multipart/form-data" },
// };
interface requestParams {
  userId: string;
  votedId: string;
}

const fetcher = async (payload: requestParams) => {
  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + `/dub/community/dubking`,
    null,
    {
      params: {
        userId: payload?.userId,
        votedId: payload?.votedId,
      },
    }
  );
  return data;
};

const useVotePost = () => {
  // const queryClient = useQueryClient();

  // queryClient.invalidateQueries({ queryKey: [queryKeys.VOTE] });

  return useMutation(fetcher, {
    onSuccess: () => {
      // console.log("투표가 정상적으로 등록되었습니다.");
    },
    onError: (error: any) => {
      // console.log("투표 등록에 실패하였습니다.", error);
    },
  });
};

export default useVotePost;
