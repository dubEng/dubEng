import { DubType } from "../../../enum/statusType";

interface Iprops {
  dubType: string;
}

export default function DubTypeTap({ dubType }: Iprops) {
  if (dubType === DubType.DUB_VIDEO) {
    return (
      <div className="text-16 text-dubblack font-semibold">
        <div className="flex ml-4">
          <p>더빙 콘텐츠</p>
          <p className="ml-16">더빙 작품</p>
        </div>
        <div className="mt-8 z-0 w-358 h-2 bg-white"></div>
        <div className="relative -top-2 w-94 h-2 bg-dubblack"></div>
      </div>
    );
  } else if (dubType === DubType.DUB_PRODUCT) {
  }
  {
    return (
      <div className="text-16 text-dubblack font-semibold">
        <div className="flex ml-4">
          <p>더빙 콘텐츠</p>
          <p className="ml-16">더빙 작품</p>
        </div>
        <div className="mt-8 z-0 w-358 h-2 bg-white"></div>
        <div className="ml-100 relative -top-2 w-82 h-2 bg-dubblack"></div>
      </div>
    );
  }

  return <></>;
}
