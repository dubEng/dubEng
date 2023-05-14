import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";
import { userLogout } from "@/stores/user/userSlice";

const fetcher = async () =>{
  const {data} = await axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/user/auth/logout`);
    
    return data
}

const useLogoutQuery = () => {
  const dispatch = useDispatch();

  return useMutation(() => fetcher(), {
    onSuccess: (data) => {
      dispatch(userLogout);
    },
    onError: (error) => {
      console.log("로그아웃 실패");
    },
  });
};

export default useLogoutQuery;
