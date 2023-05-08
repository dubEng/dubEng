import { useSelector,useDispatch } from "react-redux";
import { RootState } from "@/stores/store";
import { useMutation } from "react-query";
import axios from "axios";
import { saveUserInfo } from "@/stores/user/userSlice";

const config = {
  headers: { "Content-Type": "application/json" },
};

const fetcher = (accessToken:string) =>
  axios
    .post(process.env.NEXT_PUBLIC_BASE_URL + `/user/auth/login`,{accessToken: accessToken} ,config)
    .then(({ data }) => data);

const useUserInfoPost = () => {
  const dispatch = useDispatch();

  return useMutation(fetcher, {
    onSuccess: (data) => {
      dispatch(saveUserInfo(data));
      console.log("로그인 완료");
      
    },
    onError: (error) => {
      console.log("로그인 실패");
    },
  });
};

export default useUserInfoPost;
