import { useMutation } from "react-query";
import axios from "axios";
import { RecordSave } from "@/types/RecordSave";

const fetcher = (payload: RecordSave) =>
  axios
    .post(process.env.NEXT_PUBLIC_BASE_URL + `/record/save`, {
      videoId: payload.videoId,
      userId: payload.userId,
      url: payload.url,
    })
    .then(({ data }) => data);

const useRecordSave = () => {
  return useMutation(fetcher, {
    onSuccess: (response) => {
      console.log('response', response);
    },
    onError: (error) => {
      console.error('error', error);
    },
  });
};

export default useRecordSave;
