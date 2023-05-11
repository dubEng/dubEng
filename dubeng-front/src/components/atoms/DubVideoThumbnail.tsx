import Image from "next/image";
import WeBareBears from "../../../public/images/dump/webarebears_image.png";
// import { DubProduct } from "@/types/DubProduct";

interface Iprops {
  id: number;
  title: string;
  thumbnail: string;
}

export default function DubVideoThumbnail({ id, title, thumbnail }: Iprops) {
  return (
    <div className="relative object-cover">
      <Image
        src={thumbnail}
        className="rounded-18"
        alt={title}
        width={272}
        height={152}
      />
      <p className="absolute bottom-16 left-16 text-white font-semibold text-12">
        {title}
      </p>
    </div>
  );
}
