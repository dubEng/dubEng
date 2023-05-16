import { useMutation } from "react-query";
import axios from "axios";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

interface requestParams {
  recordId: number;
  userId: string;
}

const fetcher = async (payload: requestParams) => {
  console.log("useLikePost안에서 확인", payload.userId);
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
  console.log("useLikePost", data);

  return data;
};

const useLikePost = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("좋아요가 정상적으로 반영되었습니다.");
    },
    onError: (error) => {
      console.log("좋아요에 실패하였습니다.");
    },
  });
};

export default useLikePost;
