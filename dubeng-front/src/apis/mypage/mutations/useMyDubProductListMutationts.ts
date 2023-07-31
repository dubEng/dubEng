import axios from "axios";
import { useMutation } from "react-query";
import { MyDubProductList } from "../../../types/MyDubProductList";

const fetcher = async (payload: MyDubProductList) => {
  const data  = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + `/user/mypage/record/list`,
    {
      userId: payload.userId,
      isPublic: payload.isPublic,
      isLimit: payload.isLimit,
      lanType: payload.lanType,
    }
  );

  console.log('useMyDubProductListMutation', data);

  return data;
};

const useMyDubProductListMutation = () => {
  return useMutation(fetcher, {});
};

export default useMyDubProductListMutation;
