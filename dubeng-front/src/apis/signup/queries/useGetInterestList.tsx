import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";

const fetcher = () =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/admin/category`)
    .then(({ data }) => {
      return data;
    });

const userGetInterestList = (
) => {
  return useQuery(
    [queryKeys.INTEREST_LIST],
    () => fetcher(),
    { enabled: false }
  );
};

export default userGetInterestList;
