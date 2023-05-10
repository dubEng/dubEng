import { useMutation } from "react-query";
import axios from "axios";
import { RecordPreview } from "@/types/RecordPreview";

const fetcher = (payload: RecordPreview) =>
  axios
    .post(process.env.NEXT_PUBLIC_BASE_URL + `/record/preview`, {
      videoId: payload.videoId,
      userId: payload.userId,
      nickname: payload.nickname,
    })
    .then(({ data }) => data);

const useRecordPreviewPost = () => {
  return useMutation(fetcher, {
    onSuccess: (response) => {
      console.log('response', response);
    },
    onError: (error) => {
      console.error('error', error);
    },
  });
};

export default useRecordPreviewPost;
