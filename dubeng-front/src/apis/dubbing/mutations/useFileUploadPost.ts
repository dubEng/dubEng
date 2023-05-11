import { useMutation } from "react-query";
import axios from "axios";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

const fetcher = (formData: FormData) =>
  axios
    .post(process.env.NEXT_PUBLIC_BASE_URL + `/file/upload`, formData, config)
    .then(({ data }) => data);

const useFileUploadPost = () => {
  return useMutation(fetcher, {
    onSuccess: (response) => {
      console.log('response', response);
      console.log('녹음 파일 저장 성공');
    },
    onError: (error) => {
      console.error('녹음 파일 저장에 실패하였습니다.');
    },
  });
};

export default useFileUploadPost;
