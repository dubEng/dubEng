import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";
import { saveUserInfo } from "@/stores/user/userSlice";

const fetcher = async (accessToken:string) =>{
  // console.log(accessToken);
  
  axios.defaults.headers.common['Authorization'] = accessToken;
  const {data} = await axios
    .post(process.env.NEXT_PUBLIC_BASE_URL + `/user/auth/login`)
    
    return data
}

const useUserInfoPost = (accessToken:string) => {
  const dispatch = useDispatch();

  return useMutation(() => fetcher(accessToken), {
    onSuccess: (data) => {
      dispatch(saveUserInfo(data));
      // console.log("로그인 완료");
      
    },
    onError: (error) => {
      // console.log("로그인 실패");
    },
  });
};

export default useUserInfoPost;
