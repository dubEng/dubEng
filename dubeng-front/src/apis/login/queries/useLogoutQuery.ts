import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";
import { userLogout } from "@/stores/user/userSlice";
import { useRouter } from "next/navigation";

const fetcher = async (accessToken : string) =>{
  axios.defaults.headers.common['Authorization'] = accessToken;
  const {data} = await axios
    .post(process.env.NEXT_PUBLIC_BASE_URL + `/user/auth/logout`);
    
    return data
}

const useLogoutQuery = (accessToken:string) => {
  // state먼저 
  const dispatch = useDispatch();
  dispatch(userLogout);

  const route = useRouter();

  return useMutation(() => fetcher(accessToken), {
    onSuccess: () => {
      route.push("/");
    },
    onError: (error) => {
      console.log("로그아웃 실패");
    },
  });
};

export default useLogoutQuery;
