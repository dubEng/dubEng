import DubVideoThumbnail from "../../../components/atoms/DubVideoThumbnail";

import { DubProduct } from "@/types/DubProduct";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  bigDesktop: {
    breakpoint: { max: 3000, min: 1650 },
    items: 5,
    partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
  },
  middleDesktop: {
    breakpoint: { max: 1650, min: 1300 },
    items: 4,
    partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
  },
  desktop: {
    breakpoint: { max: 1300, min: 1000 },
    items: 3,
    partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
  },
  tablet: {
    breakpoint: { max: 1000, min: 655 },
    items: 2,
    partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
  },
  mobile: {
    breakpoint: { max: 655, min: 0 },
    items: 1,
    partialVisibilityGutter: 70, // this is needed to tell the amount of px that should be visible.
  },
};

export default function DubProductList() {
  const dubProductList: DubProduct[] = [
    {
      title: "New Year, New Bears | We Bare Bears",
      url: "",
    },
    {
      title: "겨울 왕국",
      url: "",
    },
    {
      title: "라이언킹",
      url: "",
    },
    {
      title: "워킹데드",
      url: "",
    },
    {
      title: "해리포터",
      url: "",
    },
    {
      title: "아따맘마",
      url: "",
    },
  ];

  return (
    <Carousel responsive={responsive} partialVisible>
      {dubProductList &&
        dubProductList.map((item) => (
          <DubVideoThumbnail title={item.title} url={item.url} />
        ))}
    </Carousel>
  );
}
