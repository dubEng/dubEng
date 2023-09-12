import Image from "next/image";
import WeBareBears from "../../../public/images/dump/webarebears_image.png";
import DubButton from "../atoms/DubButton";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useRouter } from "next/router";

interface Iprops {
  id: number;
  title: string;
  thumbnail: string;
  runtime?: number;
}

const MySwal = withReactContent(Swal);

export default function DubVideoListItem({
  id,
  title,
  thumbnail,
  runtime,
}: Iprops) {
  function secondsToMinutes(runtime: number) {
    const minutes = Math.floor(runtime / 60);
    const remainingSeconds = runtime % 60;
    return [minutes, remainingSeconds];
  }

  const router = useRouter();

  // const runtimeList = secondsToMinutes(runtime);

  const userId = useSelector((state: RootState) => state.user.userId);

  function handleDubButton() {
    //로그인 하지 않은 사용자라면
    if (userId.length == 0) {
      MySwal.fire({
        icon: "info",
        title: "로그인 후 이용 가능한 서비스입니다.",
      }).then(() => {
        router.push("/login");
      });
    } else {
      router.push(`/dubbing/${id}`);
    }
  }

  return (
    <div className="grid grid-cols-2 p-16 w-full mb-8 bg-white rounded-8 border-1 border-dubgraymedium">
      <Link href={`/community/shorts/video/${id}`}>
        <Image
          src={thumbnail}
          alt={title}
          width={161}
          height={96}
          className="rounded-4 w-161 h-96"
        />
      </Link>
      <div className="flex flex-col ml-16 justify-between">
        <div>
          <Link href={`/community/shorts/video/${id}`}>
            <p className="leading-18 break-words text-14 font-semibold text-dubblack line-clamp-2 ">
              {title}
            </p>
          </Link>
          {runtime ? (
            secondsToMinutes(runtime)[0] === 0 ? (
              <p className="text-dubgray text-12">
                영상 길이 : {secondsToMinutes(runtime)[1]}초
              </p>
            ) : (
              <p className="text-dubgray text-12">
                영상 길이 : {secondsToMinutes(runtime)[0]}분{" "}
                {secondsToMinutes(runtime)[1]}초
              </p>
            )
          ) : null}
        </div>
        <div>
          <DubButton onClick={handleDubButton} />
        </div>
      </div>
    </div>
  );
}
