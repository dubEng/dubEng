import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const division = (arr: any[], cnt: number) => {
  const length = arr.length;

  const divide =
    Math.floor(length / cnt) + (Math.floor(length % cnt) > 0 ? 1 : 0);
  const newArray = [];

  for (let i = 0; i < divide; i++) {
    newArray.push(arr.splice(0, cnt));
  }
  return newArray;
};

const fetcher = () =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/dub/community/category`)
    .then(({ data }) => {
      const dividedCategoryList = division(data, 8);

      return dividedCategoryList;
    });

const useCategoryQuery = () => {
  return useQuery(queryKeys.CATEGORY_LIST, () => fetcher());
};

export default useCategoryQuery;
