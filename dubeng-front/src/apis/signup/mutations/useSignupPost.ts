import { useMutation } from "react-query";
import axios from "axios";
import { SignupInfo } from "@/pages/signup/kitchen";

const config = {
  headers: { "Content-Type": "application/json" },
};

const fetcher = (signupInfo: SignupInfo) =>
  axios
    .post(process.env.NEXT_PUBLIC_BASE_URL + `/user/auth/join`, signupInfo, config)
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
