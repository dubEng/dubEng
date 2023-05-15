import { UserProfile } from "@/types/UserProfile";
import axios from "axios";
import { useMutation } from "react-query";

const fetcher = async (payload: UserProfile) => {
  console.log('userID', payload.userId);
  
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + `/user/mypage/profile`,
    {
      userId: payload.userId,
    }
  );

  console.log('useProfileQuery', data);

  return data;
};

const useProfileQuery = () => {
  return useMutation(fetcher, {});
};

export default useProfileQuery;
