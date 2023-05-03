import DubBox from "@/features/dubbing/organism/DubBox";
import { useState, useEffect } from "react";

export default function CommunityPage() {
  const [url, setUrl] = useState<string>("https://www.youtube.com/watch?v=YXOUOOtfTBs");

  const getIframeUrl = (url: string, start: number, end: number) => {
    const originalUrl = url;
    const splitUrl = originalUrl.split("watch?v=");
    const newUrl =
      splitUrl[0] +
      "embed/" +
      splitUrl[1] +
      "?start=" +
      start +
      "&end=" +
      end +
      "&controls=0&autoplay=1&loop=1";

    console.log("newUrl", newUrl);
    return newUrl;
  };

  return (
    <>
      <iframe width={800  } height={500} src={getIframeUrl(url, 5, 8)}></iframe>
      <DubBox />
    </>
  );
}
