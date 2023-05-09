import { useMutation } from "react-query";
import axios from "axios";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

const fetcher = (formData: FormData) =>
  axios
    .post("https://k8b208.p.ssafy.io" + `/recode/upload`, formData, config)
    .then(({ data }) => data);

const useRecordPreviewPost = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      console.log('녹음 파일 저장 성공');
    },
    onError: (error) => {
      console.error('녹음 파일 저장에 실패하였습니다.');
    },
  });
};

export default useRecordPreviewPost;
