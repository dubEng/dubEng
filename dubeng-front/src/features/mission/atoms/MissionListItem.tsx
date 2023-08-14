import { MissionItem } from "@/types/MissionItem";
import Image from "next/image";
import { MdOutlineLock } from "react-icons/md";
import Link from "next/link";

export default function MissionListItem({
  isComplete,
  assetUrl,
  title,
  color,
  videoId,
}: MissionItem) {
  if (isComplete) {
    return (
      <div className="w-150 h-201 relative rounded-tl-lg bg-white rounded-lg mx-12 mb-8">
        <div
          className={getBoxStyle(color)}
          css={[
            {
              backgroundColor: color,
            },
          ]}
        >
          <div className="w-80 h-80 rounded-lg">
            <Image
              src={`/assets/${assetUrl}.PNG`}
              alt={"objectImage"}
              width={80}
              height={80}
              className="rounded-lg w-80 h-80"
            />
          </div>
        </div>
        <div className="w-150 h-51 flex justify-center items-center rounded-b-lg bg-white border-1 border-dubgraymedium">
          <p className="text-14 font-bold text-dubblack text-center break-keep">
            {title}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Link href={`/dubbing/${videoId}`}>
          <div className="w-150 h-201 relative rounded-tl-lg bg-white rounded-lg mx-12 mb-8">
            <div
              className={getBoxStyle(color)}
              css={[
                {
                  backgroundColor: color,
                },
              ]}
            >
              <div className="w-80 h-80 rounded-lg">
                <Image
                  src={`/assets/${assetUrl}.PNG`}
                  alt={"objectImage"}
                  width={80}
                  height={80}
                  className="rounded-lg w-80 h-80"
                />
              </div>
              <div className="bg-black opacity-50 absolute top-0 left-0 w-150 h-150 rounded-t-lg"></div>
              <div className="absolute flex flex-col items-center justify-center">
                <MdOutlineLock size={32} className=" text-dubgraylight" />
                <p className=" text-dubgraylight text-12">
                  더빙하고 아이템 얻기!
                </p>
              </div>
            </div>
            <div className="w-150 h-51 flex justify-center items-center rounded-b-lg bg-white border-1 border-dubgraymedium">
              <p className="text-14 font-bold text-dubblack text-center break-keep">
                {title}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  //TODO: twin.macro 적용 해야함
  function getBoxStyle(color: string): string {
    return `relative w-150 h-150 rounded-tl-lg rounded-tr-lg flex justify-center items-center`;
  }
}
