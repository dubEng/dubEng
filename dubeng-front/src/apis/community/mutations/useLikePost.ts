import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import * as queryKeys from "@/constants/queryKeys";

interface requestParams {
  recordId: number;
  userId: string;
}

const fetcher = async (payload: requestParams) => {
  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL +
      `/dub/community/like/${payload.recordId}`,
    null,
    {
      params: {
        userId: payload.userId,
      },
    }
  );

  return data;
};

const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("좋아요가 정상적으로 반영되었습니다.");
      return queryClient.invalidateQueries(queryKeys.LIKE_INFO);
    },
    onError: (error) => {
      console.log("좋아요에 실패하였습니다.");
    },
  });
};

export default useLikePost;
