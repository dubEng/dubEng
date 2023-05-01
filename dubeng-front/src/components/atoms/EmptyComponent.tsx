import Image from "next/image";
import EmptyImage from "../../../public/images/logo/EmptyImage.png";

export default function EmptyComponent() {
  return (
    <div>
      <Image src={EmptyImage} alt="EmptyImage" />
      <p>더빙 목록이 없습니다.</p>
    </div>
  );
}
