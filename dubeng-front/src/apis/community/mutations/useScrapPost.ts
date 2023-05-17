import { useMutation } from "react-query";
import axios from "axios";

interface requestParams {
  userId: string;
  videoId: number;
}

const fetcher = async (payload: requestParams) => {
  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + `/dub/contents/scrap/${payload.videoId}`,
    null,
    {
      params: {
        userId: payload.userId,
      },
    }
  );
  console.log("post결과를 받겠다", data);
  return data;
};

const useScrapPost = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("스크랩 성공");
      // window.alert("스크랩 정상적으로 반영");
    },
    onError: (error) => {
      console.log("스크랩 실패");
      // window.alert("스크랩 실패");
    },
  });
};

export default useScrapPost;
