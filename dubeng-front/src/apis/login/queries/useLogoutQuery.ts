import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";
import { userLogout } from "@/stores/user/userSlice";
import { useRouter } from "next/navigation";

const fetcher = async () =>{
  const {data} = await axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/user/auth/logout`);
    console.log(data);
    
    return data
}

const useLogoutQuery = () => {
  console.log("로그아웃 되냐??");
  
  const dispatch = useDispatch();
  const route = useRouter();

  return useMutation(() => fetcher(), {
    onSuccess: (data) => {
      console.log("로그아웃 해줘");
      
      dispatch(userLogout);
      route.push("/");
    },
    onError: (error) => {
      console.log("로그아웃 실패");
    },
  });
};

export default useLogoutQuery;
