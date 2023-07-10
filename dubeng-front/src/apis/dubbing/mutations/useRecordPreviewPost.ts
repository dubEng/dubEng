import { useMutation } from "react-query";
import axios from "axios";
import { RecordPreview } from "@/types/RecordPreview";

const fetcher = async (payload: RecordPreview) => {
  axios.defaults.headers.common["Authorization"] = payload.accessToken;

  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + `/record/preview`,
    {
      videoId: payload.videoId,
      userId: payload.userId,
      nickname: payload.nickname,
    },
    {
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );

  return data;
};

const useRecordPreviewPost = () => {
  return useMutation(fetcher, {
    onSuccess: (response) => {
      console.log("useRecordPreviewPost", response);
    },
    onError: (error) => {
      // console.error("error", error);
    },
  });
};

export default useRecordPreviewPost;
