import DubVideoThumbnail from "@/components/atoms/DubVideoThumbnail";
import VoteCard from "../molecules/VoteCard";
import VoteButton from "../atoms/VoteButton";

import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import { useEffect, useRef, useState } from "react";
import profile_01 from "../../../../public/images/dump/profile_01.svg";
import profile_02 from "../../../../public/images/dump/profile_02.svg";
import Swal from "sweetalert2";
import useVoteQuery from "@/apis/community/queries/useVoteQuery";
import { useDispatch } from "react-redux";
import useVotePost from "@/apis/community/mutations/useVotePost";
import EmptyComponent from "@/components/atoms/EmptyComponent";
import { EmptyType } from "@/enum/statusType";

interface Iprops {
  languageIndex: string;
  userId: string;
}

export default function Vote({ languageIndex, userId }: Iprops) {
  // 사용하는 전역 변수

  // VoteCard마다 현재 재생 중인지 알기 위한 변수
  // const [isPlayingUser1, setIsPlayingUser1] = useState(false);
  // const [isPlayingUser2, setIsPlayingUser2] = useState(false);

  // 재생할 파일 구분하기 위한 변수
  const audioRef1 = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);

  // Youtube 플레이어 관련 변수 및 함수 설정

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();

  const [nowPlaying, setNowPlaying] = useState<boolean>(false);

  const [oncePlayed, setOncePlayed] = useState(false);

  useEffect(() => {
    refetch();
  }, []);
  // useQuery들로 가져오는 것들
  const {
    data: voteData,
    isLoading: voteDataLoading,
    refetch,
  } = useVoteQuery(languageIndex, userId);

  const [videoId, setVideoId] = useState<any>(null);

  useEffect(() => {
    if (voteData) {
      setVideoId(transferYoutube(voteData.result?.videoPath));
    }
  }, [voteData]);

  // 재생할 Video의 ID값

  function transferYoutube(videoPath: string) {
    const originalUrl = videoPath;
    const splitUrl = originalUrl?.split("watch?v=");
    if (splitUrl) {
      const transferVideoPath = splitUrl[1];
      return transferVideoPath;
    }
  }

  const opts: YouTubeProps["opts"] = {
    height: "174",
    width: "326",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      start: voteData?.result?.startTime,
      end: voteData?.result?.endTime,
      rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
      modestbranding: 0, // 컨트롤 바에 youtube 로고를 표시하지 않음
      controls: 0,
    },
  };

  // 유튜브 플레이어 style 지정 (근데 적용이 안 됨)
  const style: YouTubeProps["style"] = {
    borderRadius: "20px",
  };

  // async function voteDubKing(votedId: string) {

  //   if (formData) {
  //     try {
  //       const videoPostResult = await mutation.mutateAsync(formData);
  //       // 스크립트 초기화
  //       dispatch(clearScriptsInfo());
  //     } catch (error) {}
  //   } else {
  //     console.log("formData가 존재하지 않습니다.");
  //   }
  // }
  const { mutate, isSuccess, isError } = useVotePost();

  function handleVoteUser1Button() {

    const payload = {
      userId: userId,
      votedId: voteData.result.user1.id as string,
    };
    // const payload = {
    //     userId: userId,
    //     votedId: voteData.result.user1.id as string,
    // }

    mutate(payload);
    refetch();
  }

  function handleVoteUser2Button() {

    const payload = {
      userId: userId,
      votedId: voteData.result.user2.id as string,
    };
    // const payload = {
    //     userId: userId,
    //     votedId: voteData.result.user1.id as string,
    // }

    mutate(payload);
    refetch();
  }

  // 유저1 플레이 함수
  function handlePlayUser1Button() {
    // console.log("user1 플레이 버튼 눌렀다!");

    // 현재 user1에 대한 상태값을 반대로 바꿔주기
    // setIsPlayingUser1(!isPlayingUser1);
    // console.log("set으로 상태값 바뀌어졌나요");
    // if (
    //   oncePlayed &&
    //   audioRef1.current?.currentTime &&
    //   audioRef1.current?.currentTime > opts.start
    // ) {
    //   setOncePlayed(false);
    //   // console.log("1 끝났따");
    //   youtubePlayer.seekTo(opts.start);
    //   youtubePlayer.playVideo();
    // }
    // console.log("audioRef1.current", audioRef1.current);
    // console.log("audioRef1.current", audioRef1.current?.paused);
    // console.log("audioRef1.current", audioRef1.current?.currentTime);

    if (audioRef1.current && audioRef1.current.paused) {
      audioRef2.current?.pause();
      youtubePlayer.seekTo(
        opts.playerVars.start + audioRef1.current.currentTime
      );

      audioRef1.current.play();
      youtubePlayer.playVideo();

      // console.log("현재 audioRef1 상태는?", audioRef1.current.paused);
    } else if (audioRef1.current && !audioRef1.current.paused) {
      audioRef1.current.pause();
      youtubePlayer.pauseVideo();
      // console.log("현재 audioRef1 상태는?", audioRef1.current.paused);
    }
  }

  // 유저2 플레이 함수
  function handlePlayUser2Button() {

    if (audioRef2.current && audioRef2.current?.currentTime === opts.start) {
      // console.log("2 끝났따");
      youtubePlayer.seekTo(opts.start);
      youtubePlayer.playVideo();
    }
    // 중간에 누르면 상대방 current을 paused로 만들어버리는 로직 필요

    if (audioRef2.current && audioRef2.current.paused) {
      audioRef1.current?.pause();
      youtubePlayer.seekTo(
        opts.playerVars.start + audioRef2.current.currentTime
      );

      audioRef2.current.play();
      youtubePlayer.playVideo();
      // console.log("현재 audioRef2 상태는?", audioRef2.current.paused);
      // console.log("확인", audioRef2.current.currentTime);
    } else if (audioRef2.current && !audioRef2.current.paused) {
      audioRef2.current.pause();
      youtubePlayer.pauseVideo();
      // console.log("현재 audioRef2 상태는?", audioRef2.current.paused);
      // console.log("확인", audioRef2.current.currentTime);
    }
  }

  // 플레이 함수들
  // player 준비시 실행
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    const player = event.target;
    setYoutubePlayer(player);
    player.mute();
  };

  const onPlay: YouTubeProps["onPlay"] = (event) => {
    console.log("onPlay");
    console.log("event", event);
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    console.log("onStateChange");

    if (event.data === 1) {
      // 재생 중일 때
      setNowPlaying(true);
    } else if (event.data === 2 || event.data === 0) {
      //영상이 종료되거나, 일시 정지 시
      setNowPlaying(false);
    }
  };

  return (
    <>
      {voteData && voteData?.result ? (
        <div className="flex flex-col items-center justify-center p-16 bg-[#FFFAFA] rounded-8 border-1 border-[#FFD8D8]">
          <audio
            ref={audioRef1}
            // controls
            src={voteData.result.user1.recordPath}
          ></audio>
          <audio
            ref={audioRef2}
            // controls
            src={voteData.result.user2.recordPath}
          ></audio>
          {videoId && (
            <div className="relative">
              <YouTube
                videoId={videoId}
                opts={opts}
                style={style}
                onReady={onPlayerReady}
                onEnd={(e) => {
                  console.log("onEnd 발생");

                  youtubePlayer.pauseVideo();
                  youtubePlayer.seekTo(opts.start);
                  setOncePlayed(true);
                }}
                onPlay={onPlay}
                onStateChange={onStateChange}
                className="relative"
              />
              <div className="opacity-100 absolute top-0 left-0 w-320 h-174"></div>
            </div>
          )}
          <div className="mt-16 flex justify-between">
            <div className="space-y-16">
              <VoteCard
                username={voteData.result.user1.nickname}
                description={voteData.result.user1.description}
                userImage={voteData.result.user1.profileImage ?? profile_01}
                isPlaying={!audioRef1.current?.paused}
                onClick={handlePlayUser1Button}
              />
              <VoteButton isSelected={false} onClick={handleVoteUser1Button} />
            </div>
            <p className="text-16 font-semibold text-dubgray mt-55 mx-13">vs</p>
            <div className="space-y-16">
              <VoteCard
                username={voteData.result.user2.nickname}
                description={voteData.result.user2.description}
                userImage={voteData.result.user2.profileImage ?? profile_02}
                isPlaying={!audioRef2.current?.paused}
                onClick={handlePlayUser2Button}
              />
              <VoteButton isSelected={false} onClick={handleVoteUser2Button} />
            </div>
          </div>
        </div>
      ) : (
        <EmptyComponent status={EmptyType.EMPTY_VOTE} />
      )}
    </>
  );
}
