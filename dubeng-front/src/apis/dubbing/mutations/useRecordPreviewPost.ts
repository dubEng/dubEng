import { useMutation } from "react-query";
import axios from "axios";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

const fetcher = (formData: FormData) =>
  axios
    .post("https://k8b208.p.ssafy.io" + `/record/save`, formData, config)
    .then(({ data }) => data);

const useRecordPreviewPost = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      window.alert("비디오 저장 성공.");
    },
    onError: (error) => {
      window.alert("문제 발생");
    },
  });
};

export default useRecordPreviewPost;
