import Image from "next/image";
import EmptyImage from "../../../public/images/logo/EmptyImage.png";

interface Iprops {
  status: string;
}

export default function EmptyComponent() {
  const emptyMessages = [
    {
      message: "",
    },
  ];

  return (
    <div>
      <Image src={EmptyImage} alt="EmptyImage" />
      <p className="text-14 text-semiBold text-dubgray">
        더빙 목록이 없습니다.
      </p>
    </div>
  );
}
