import { useMutation } from "react-query";
import axios from "axios";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

const fetcher = (formData: FormData) =>
  axios
    .post("https://k8b208.p.ssafy.io/admin" + `/saveVideo`, formData, config)
    .then(({ data }) => data);

const useVideoPost = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      window.alert("비디오가 정상적으로 등록되었습니다.");
    },
    onError: (error) => {
      window.alert("문제 발생");
    },
  });
};

export default useVideoPost;
