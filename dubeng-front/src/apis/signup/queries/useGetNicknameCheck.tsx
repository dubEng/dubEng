import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";

const fetcher = (nickname: string) =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/user/auth/check/${nickname}`)
    .then(({ data }) => {
      return data;
    });

const userGetNicknameCheck = (
    nickname: string
) => {
  return useQuery(
    [queryKeys.NICKNAME, nickname],
    () => fetcher(nickname),
    { enabled: false }
  );
};

export default userGetNicknameCheck;
