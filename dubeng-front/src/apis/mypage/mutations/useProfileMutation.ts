import { UserProfile } from "@/types/UserProfile";
import axios from "axios";
import { useMutation } from "react-query";

const fetcher = async (payload: UserProfile) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + `/user/mypage/profile`,
    {
      userId: payload.userId,
    }
  );
  return data;
};

const useProfileMutation = () => {
  return useMutation(fetcher, {});
};

export default useProfileMutation;
