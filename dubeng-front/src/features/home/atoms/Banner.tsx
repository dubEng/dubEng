import Image from "next/image";
import BannerImage from "../../../../public/images/home/banner.png";

export default function Banner(){
  return (<Image src={BannerImage} alt={"banner"} />);
}