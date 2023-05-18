import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { RecordSave } from "@/types/RecordSave";
import { useRouter } from "next/navigation";
import * as queryKeys from "../../../constants/queryKeys";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const fetcher = (payload: RecordSave) =>
  axios
    .post(process.env.NEXT_PUBLIC_BASE_URL + `/record/save`, {
      videoId: payload.videoId,
      userId: payload.userId,
      url: payload.url,
      totalRecordCount: payload.totalRecordCount,
      totalRecordTime: payload.totalRecordTime,
      runtime: payload.runtime
    })
    .then(({ data }) => data);

const useRecordSave = () => {
  const route = useRouter();
  const queryClient = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: async (response) => {
      await MySwal.fire({icon: 'success',text: "더빙에 성공하였습니다." });
      console.log('useRecordSave response', response);
      await queryClient.setQueryData(queryKeys.MISSION_COMPLETE, response);
      await queryClient.invalidateQueries(queryKeys.MISSION_COMPLETE);
      route.push("/community");
    },
    onError: (error) => {
      console.error("error: ", error);
      MySwal.fire({ icon: "error", text: "더빙에 실패하였습니다." });
    },
  });
};

export default useRecordSave;
