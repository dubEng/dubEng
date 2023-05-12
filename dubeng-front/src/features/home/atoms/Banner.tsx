import Image from "next/image";
import BannerImage from "../../../../public/images/home/banner.png";
import HomeBannerImage from "../../../../public/images/home/HomeBanner.svg";

export default function Banner() {
  return (
    <div className="p-16">
      <Image src={HomeBannerImage} alt={"banner"} />
    </div>
  );
}
