import { useMutation } from "react-query";
import axios from "axios";
import { SignupInfo } from "@/pages/signup/kitchen";

const config = {
  headers: { "Content-Type": "application/json" },
};

const fetcher = (signupInfo: SignupInfo) =>
  axios
    // .post("https://k8b208.p.ssafy.io/user" + `/auth/join`, signupInfo, config)
    .post("http://localhost:9000/user" + `/auth/join`, signupInfo, config)
    .then(({ data }) => data);

const useSignupPost = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      window.alert("회원가입이 정상적으로 되었습니다!");
    },
    onError: (error) => {
      window.alert("회원가입 오류~");
    },
  });
};

export default useSignupPost;
