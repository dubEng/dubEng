import DubVideoThumbnail from "@/components/atoms/DubVideoThumbnail";
import VoteCard from "../molecules/VoteCard";
import VoteButton from "../atoms/VoteButton";

import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import { useRef, useState } from "react";
import profile_01 from "../../../../public/images/dump/profile_01.svg";
import profile_02 from "../../../../public/images/dump/profile_02.svg";
import Swal from "sweetalert2";

export default function Vote() {
  // useQuery들로 가져오는 것들

  // VoteCard마다 현재 재생 중인지 알기 위한 변수
  // const [isPlayingUser1, setIsPlayingUser1] = useState(false);
  // const [isPlayingUser2, setIsPlayingUser2] = useState(false);

  // 재생할 파일 구분하기 위한 변수
  const audioRef1 = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);

  function handleVoteButton() {
    console.log("투표 버튼 눌렀다!");
    Swal.fire("더빙왕 투표 Coming soon 👑");
  }

  // 유저1 플레이 함수
  function handlePlayUser1Button() {
    console.log("user1 플레이 버튼 눌렀다!");

    // 현재 user1에 대한 상태값을 반대로 바꿔주기
    // setIsPlayingUser1(!isPlayingUser1);
    // console.log("set으로 상태값 바뀌어졌나요");
    if (
      oncePlayed &&
      audioRef1.current?.currentTime &&
      audioRef1.current?.currentTime > opts.start
    ) {
      setOncePlayed(false);
      console.log("1 끝났따");
      youtubePlayer.seekTo(opts.start);
      youtubePlayer.playVideo();
    }

    if (audioRef1.current && audioRef1.current.paused) {
      audioRef2.current?.pause();
      youtubePlayer.seekTo(audioRef1.current.currentTime);

      audioRef1.current.play();
      youtubePlayer.playVideo();

      console.log("현재 audioRef1 상태는?", audioRef1.current.paused);
    } else if (audioRef1.current && !audioRef1.current.paused) {
      audioRef1.current.pause();
      youtubePlayer.pauseVideo();
      console.log("현재 audioRef1 상태는?", audioRef1.current.paused);
    }
  }

  // 유저2 플레이 함수
  function handlePlayUser2Button() {
    console.log("user2 플레이 버튼 눌렀다!");

    if (audioRef2.current && audioRef2.current?.currentTime === opts.start) {
      console.log("2 끝났따");
      youtubePlayer.seekTo(opts.start);
      youtubePlayer.playVideo();
    }
    // 중간에 누르면 상대방 current을 paused로 만들어버리는 로직 필요

    if (audioRef2.current && audioRef2.current.paused) {
      audioRef1.current?.pause();
      youtubePlayer.seekTo(audioRef2.current.currentTime);

      audioRef2.current.play();
      youtubePlayer.playVideo();
      console.log("현재 audioRef2 상태는?", audioRef2.current.paused);
      console.log("확인", audioRef2.current.currentTime);
    } else if (audioRef2.current && !audioRef2.current.paused) {
      audioRef2.current.pause();
      youtubePlayer.pauseVideo();
      console.log("현재 audioRef2 상태는?", audioRef2.current.paused);
      console.log("확인", audioRef2.current.currentTime);
    }
  }

  // Youtube 플레이어 관련 변수 및 함수 설정

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();

  const [nowPlaying, setNowPlaying] = useState<boolean>(false);

  const [oncePlayed, setOncePlayed] = useState(false);

  // 재생할 Video의 ID값
  const [videoId, setVideoId] = useState<string>("1uRBxyPqkh0");

  const opts: YouTubeProps["opts"] = {
    height: "174",
    width: "326",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      start: 0,
      end: 27,
      rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
      modestbranding: 0, // 컨트롤 바에 youtube 로고를 표시하지 않음
      controls: 0,
    },
  };

  // 유튜브 플레이어 style 지정 (근데 적용이 안 됨)
  const style: YouTubeProps["style"] = {
    borderRadius: "20px",
  };

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
    <div className="flex flex-col items-center justify-center p-16 bg-[#FFFAFA] rounded-8 border-1 border-[#FFD8D8]">
      <audio
        ref={audioRef1}
        // controls
        src="https://dubingdubing.s3.ap-northeast-2.amazonaws.com/2780795332[인턴] - 안하는 것보다 늦게하는 것이 낫다.wav"
      ></audio>
      <audio
        ref={audioRef2}
        // controls
        src="https://dubingdubing.s3.ap-northeast-2.amazonaws.com/2780794561[인턴] - 안하는 것보다 늦게하는 것이 낫다.wav"
      ></audio>
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
      />
      <div className="mt-16 flex justify-between">
        <div className="space-y-16">
          <VoteCard
            username={"월요일좋아"}
            description="안녕하세요 월요일 좋아입니다."
            userImage={profile_01}
            isPlaying={!audioRef1.current?.paused}
            onClick={handlePlayUser1Button}
          />
          <VoteButton isSelected={false} onClick={handleVoteButton} />
        </div>
        <p className="text-16 font-semibold text-dubgray mt-55 mx-13">vs</p>
        <div className="space-y-16">
          <VoteCard
            username={"아이스크림"}
            description="아이스크림 같이 먹을 사람!"
            userImage={profile_02}
            isPlaying={!audioRef2.current?.paused}
            onClick={handlePlayUser2Button}
          />
          <VoteButton isSelected={false} onClick={handleVoteButton} />
        </div>
      </div>
    </div>
  );
}
