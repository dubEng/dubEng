import { useMutation } from "react-query";
import axios from "axios";

// const config = {
//   headers: { "Content-Type": "multipart/form-data" },
// };
interface requestParams {
  userId: string;
  votedId: string;
}

const fetcher = async (payload: requestParams) => {
  console.log("payload", payload);
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
  return useMutation(fetcher, {
    onSuccess: () => {
      window.alert("더빙왕 투표가 정상적으로 등록되었습니다.");
    },
    onError: (error) => {
      window.alert("더빙왕 투표 문제 발생");
    },
  });
};

export default useVotePost;
