import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = () =>
<<<<<<< HEAD
  axios.get("www" + `/category`).then(({ data }) => data.data);
=======
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/admin/category`)
    .then(({ data }) => {
      return data;
    });
>>>>>>> develop-front

const useCategoryQuery = () => {
  return useQuery(queryKeys.CATEGORY, () => fetcher());
};

export default useCategoryQuery;
