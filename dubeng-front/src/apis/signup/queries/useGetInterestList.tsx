import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";
import { Interest } from "@/pages/signup/interest";

const fetcher = () =>
  axios
    // .get(process.env.NEXT_PUBLIC_BASE_URL + `/admin/category`)
    .get('https://k8b208.p.ssafy.io' + `/admin/category`)
    .then(({ data }) => {
      const response = data as Interest[];
      
      return response;
    });

const userGetInterestList = (
) => {
  return useQuery(
    [queryKeys.INTEREST_LIST],
    () => fetcher(),
  );
};

export default userGetInterestList;
