import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";

const fetcher = async (accessToken:string) =>{
    axios.defaults.headers.common['Authorization'] = accessToken;
    const {data} = await axios
        .get(process.env.NEXT_PUBLIC_BASE_URL + `/user/mission/list`);
        console.log(data);
        
    return data;
}

const useMissionListQuery = (accessToken:string) => {
  return useQuery(
    [queryKeys.MISSION_LIST],
    () => fetcher(accessToken),
  );
};

export default useMissionListQuery;
