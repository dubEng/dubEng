import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const fetcher = async (accessToken: string) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + `/user/auth/quit`,
    {
      accessToken,
    }
  );

  console.log("use회원탈퇴", data);

  return data;
};

const useDeleteAccountPost = () => {
  const MySwal = withReactContent(Swal);
  const router = useRouter();

  return useMutation(fetcher, {
    onSuccess: () => {
      MySwal.fire({
        icon: "success",
        text: "정상적으로 탈퇴되었습니다.",

        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
        backdrop: false,
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          console.log("정상적으로 탈퇴 됨");
          router.push("/login/logout");
        }
      });
    },
    onError: () => {
      MySwal.fire({
        icon: "error",
        text: "회원 탈퇴를 실패하였습니다.",
      });
    },
  });
};

export default useDeleteAccountPost;
