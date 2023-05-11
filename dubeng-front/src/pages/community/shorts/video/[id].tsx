import useContentsDetailQuery from "@/apis/community/queries/useContentsDetailQuery";
import { useRouter } from "next/router";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

export default function ShortsVideoPage() {
  const router = useRouter();

  //추후에 languageType도 같이 받아오면 좋을 듯!
  const { data } = useContentsDetailQuery("english", router.query.id as string);

  function transferYoutube(videoPath: string) {
    const originalUrl = videoPath;
    const splitUrl = originalUrl.split("watch?v=");
    const transferVideoPath = splitUrl[1];
    return transferVideoPath;
  }

  return (
    <>
      {/* <YouTube
        videoId={transferYoutube(data.videoPath)}
        opts={{
          height: "221",
          width: "390",
          playerVars: {
            start: data.startTime,
            end: data.endTime,
            autoplay: 0,
            modestbranding: 0, // 컨트롤 바에 youtube 로고를 표시하지 않음
            controls: 0,
          },
        }}
          onReady={onPlayerReady}
          onEnd={(e) => {
            console.log("onEnd");

            youtubePlayer.pauseVideo();
            youtubePlayer.seekTo(data.startTime);

            setSelectedScript(0);
          }}
          onPlay={onPlay}
          onStateChange={onStateChange}
      /> */}
    </>
  );
}
