"use client";
import "regenerator-runtime/runtime";
import ListenButton from "../atoms/ListenButton";
import PlayButton from "../atoms/PlayButton";
import RecordButton from "../atoms/RecordButton";
import { SoundType } from "../../../enum/statusType";

import { useEffect, useRef, useState } from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Script } from "@/types/Script";
import PitchGraph from "../atoms/PitchGraph";
import useFileUploadPost from "@/apis/dubbing/mutations/useFileUploadPost";

import Switch from "@mui/material/Switch";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import PlayBarSound from "../atoms/PlayBarSound";
import PlayBarRecording from "../atoms/PlayBarRecording";
import PlayBarOrigin from "../atoms/PlayBarOrigin";

// import { useSwiperSlide } from "swiper/react";

export default function DubBox({
  videoId,
  duration,
  content,
  translateContent,
  pitchList,
  scriptLength,
  startTime,
  scriptIndex,
  youtubePlayer,
  speechToText,
  setSpeechToText,
  setTimerId,
  timerId,
}: Script) {
  // const swiperSlide = useSwiperSlide();

  //오디오 현재 시간
  const [currentTime, setCurrentTime] = useState(0);
  const [progressOriginBarWidth, setProgressOriginBarWidth] =
    useState<string>("0%");
  const [progressSoundBarWidth, setProgressSoundBarWidth] =
    useState<string>("0%");
  const [progressRecordBarWidth, setProgressRecordBarWidth] =
    useState<string>("0%");

  const nickname = useSelector((state: RootState) => state.user.nickname);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [soundStatus, setSoundStatus] = useState<SoundType>(SoundType.DISABLE);

  const [answer, setAnswer] = useState<boolean>(false);

  const [koSubTitle, setKoSubTitle] = useState(true);

  const handleSubTitleSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKoSubTitle(event.target.checked);
  };

  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaStreamRef = useRef<any>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [myPitchList, setMyPitchList] = useState<number[]>([]);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const { mutate } = useFileUploadPost();

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        setIsRecording(false);
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        
        const formData = new FormData();
        
        formData.append("recodeInfo.nickname", nickname);
        formData.append("recodeInfo.recodeNum", scriptIndex.toString());
        formData.append("recodeInfo.videoId", videoId);
        
        const file = new File([audioBlob], "myRecordingFile.wav", {
          type: "audio/wav",
        }); // File 객체 생성
        
        formData.append("audioFile", file);
        
        mutate(formData);
        
        //녹음 종료 후 1초뒤에 STT 인식 종료
        setTimeout(()=> {
          SpeechRecognition.stopListening();
        }, 1000);
      };
    })();
  }, []);

  // 원본듣기 ProgressBar 업데이트를 위한 로직
  useEffect(() => {
    let timer: any = null;
    let startTime: number | null = null;

    if (isPlaying) {
      startTime = performance.now();
      setProgressOriginBarWidth("0%");
      timer = setInterval(() => {
        const elapsedTime = performance.now() - startTime!;
        const progress =
          Math.floor(Math.min((elapsedTime / duration) * 100, 100)) + "%";

        setProgressOriginBarWidth(progress);

        if (elapsedTime >= duration) {
          setProgressOriginBarWidth("0%");
          clearInterval(timer);
        }
      }, 100);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isPlaying]);

  // 녹음하기 ProgressBar 업데이트를 위한 로직
  useEffect(() => {
    let timer: any = null;
    let startTime: number | null = null;

    if (isRecording) {
      startTime = performance.now();
      setProgressRecordBarWidth("0%");
      timer = setInterval(() => {
        const elapsedTime = performance.now() - startTime!;
        const progress =
          Math.floor(Math.min((elapsedTime / duration) * 100, 100)) + "%";

        setProgressRecordBarWidth(progress);

        if (elapsedTime >= duration) {
          setProgressRecordBarWidth("0%");
          clearInterval(timer);
        }
      }, 100);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRecording]);

  //내 녹음 다시 듣기 ProgressBar 업데이트를 위한 시간 로직
  useEffect(() => {
    const audio = audioRef.current!;
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  //내 녹음 다시 듣기 ProgressBar 업데이트
  useEffect(() => {
    const progress = Math.floor((currentTime * 100) / (duration / 1000)) + "%";
    setProgressSoundBarWidth(progress);
  }, [currentTime]);

  //STT listening 상태 변경 시 작동
  useEffect(() => {
    setSpeechToText(transcript);
    onMatching(transcript);

    // 스크립트 리셋
    resetTranscript();
  }, [listening]);

  function handleScriptPlayButton() {
    setIsPlaying(true);

    const time = youtubePlayer.getCurrentTime();
    // console.log('time', time);
    // console.log('startTime', startTime/1000);

    // if (time != startTime) {
    //   youtubePlayer.seekTo(startTime);
    //   await setTimeout(() => {}, 800);
    // }
    youtubePlayer.seekTo(startTime/1000);
    youtubePlayer.playVideo();

    const timerId = window.setTimeout(() => {
      youtubePlayer.pauseVideo();
      setIsPlaying(false);
    }, duration);

    setTimerId(timerId);
  }

  // function handleScriptStopButton() {
  //   setIsPlaying(false);

  //   // 기존에 타이머가 동작중이었을 경우 clear
  //   window.clearTimeout(timerId);
  //   youtubePlayer.pauseVideo();
  // }

  function handleRecordButton() {
    setIsRecording(true);
    // analyzeMicrophone(mediaStreamRef.current);

    // 녹음 전 유튜브 영상 멈추기
    setIsPlaying(false);
    youtubePlayer.pauseVideo();

    // 녹음 시작하기
    startRecording(duration);
  }

  function handleListenButton() {
    setSoundStatus(SoundType.PLAYING);

    // 내 소리 듣기 전 유튜브 영상 멈추기
    setIsPlaying(false);
    youtubePlayer.pauseVideo();

    // 내 소리 듣기
    listenMyVoice();
  }

  function handleAudioEnded() {
    setSoundStatus(SoundType.DEFAULT);
  }

  function startRecording(recordingTime: number) {
    // STT 시작
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });

    // 녹음 시작
    audioChunksRef.current = [];
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
    }

    // 지정 시간 후 녹음 종료
    setTimeout(() => {
      if (mediaRecorderRef.current?.state == "recording") {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      setSoundStatus(SoundType.DEFAULT);
    }, recordingTime);
  }

  const listenMyVoice = () => {
    const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
    }
  };

  const onMatching = (myAnswer: string) => {
    // 스크립트 특수문자 제거하기
    // [\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]
    const reg = /[`~!@#$%^&*()_|+\-=?;:'",.\\{}<>/]/gim;

    const answer = content.replace(reg, "").toLowerCase().split(" ");

    const speaker = myAnswer
      .toLowerCase()
      .replace(reg, "")
      .toLowerCase()
      .split(" ");

    // 정답 매칭
    let flag = true;
    let idx = 0;
    if (answer?.length && speaker.length) {
      if (answer?.length != speaker.length) {
        flag = false;
      } else {
        while (idx < answer.length && idx < speaker.length) {
          if (answer[idx] != speaker[idx]) {
            flag = false;
            break;
          }
          idx++;
        }
      }
    }

    setAnswer(flag);
  };

  // const analyzeMicrophone = (stream: MediaStream) => {
  //   const audioCtx = new AudioContext();
  //   const analyser = audioCtx.createAnalyser();
  //   analyser.fftSize = 4096;
  //   const dataArray = new Uint8Array(analyser.frequencyBinCount);

  //   const source = audioCtx.createMediaStreamSource(stream);
  //   source.connect(analyser);
  //   const recordingTimer = setInterval(() => {
  //     analyser.getByteFrequencyData(dataArray);
  //     const maxIndex = dataArray.indexOf(Math.max(...dataArray));
  //     const maxHz = (maxIndex * audioCtx.sampleRate) / analyser.fftSize;
  //     console.log("maxHz", maxHz);
  //     setMyPitchList((data) => [...data, maxHz]);
  //   }, 500);
  //   setTimeout(() => {
  //     clearInterval(recordingTimer);
  //     stream.getTracks().forEach((track) => track.stop());
  //   }, duration);
  // };

  return (
    <div className="w-359 bg-white rounded-20 container mx-auto p-16">
      <div className="flex justify-between">
        <p className="text-12 text-dubblack font-normal h-25">
          {scriptIndex}/{scriptLength}
        </p>
        <div className="flex justify-end items-center h-25">
          <span className="text-12 text-dubblack font-normal">번역</span>
          <Switch checked={koSubTitle} onChange={handleSubTitleSwitchChange} />
        </div>
      </div>
      <div className="flex justify-center">
        <PitchGraph moviePitchList={pitchList} myPitchList={myPitchList} />
      </div>
      <p className="text-14 text-dubblack font-normal flex justify-start mx-16">
        {content}
      </p>
      {koSubTitle ? (
        <p className="text-14 text-dubgray font-normal flex justify-start mx-16">
          {translateContent}
        </p>
      ) : (
        <p className="text-14 text-dubgray font-normal flex justify-start mx-16 invisible">
          {translateContent}
        </p>
      )}
      {listening ? (
        <p className="text-14 text-dubblue font-normal flex justify-start h-34 mx-16 mb-16">
          {transcript}
        </p>
      ) : answer ? (
        <p className="text-14 text-[#0FA64B] font-normal flex justify-start h-34 mx-16 mb-16">
          {speechToText}
        </p>
      ) : (
        <p className="text-14 text-dubcoral font-normal flex justify-start h-34 mx-16 mb-16">
          {speechToText}
        </p>
      )}
      <audio
        ref={audioRef}
        style={{ display: "none" }}
        onEnded={handleAudioEnded}
      />
      <p className="text-12 text-dubblack font-normal flex justify-end mx-16 mb-4">
        {(duration / 1000).toFixed(2)}초
      </p>
      <div className="mb-16 mx-16">
        {isPlaying ||
        soundStatus === SoundType.PLAYING ||
        isRecording ? null : (
          <PlayBarOrigin width={"0%"} />
        )}
        {isPlaying ? <PlayBarOrigin width={progressOriginBarWidth} /> : null}
        {soundStatus === SoundType.PLAYING ? (
          <PlayBarSound width={progressSoundBarWidth} />
        ) : null}
        {isRecording ? (
          <PlayBarRecording width={progressRecordBarWidth} />
        ) : null}
      </div>
      <div className="flex justify-evenly">
        <PlayButton
          isPlaying={isPlaying}
          playVideo={handleScriptPlayButton}
          stopVideo={() => {}}
          disable={isRecording || soundStatus == SoundType.PLAYING}
        />
        <RecordButton
          isRecording={isRecording}
          startRecording={handleRecordButton}
          disable={soundStatus == SoundType.PLAYING}
        />
        <ListenButton
          soundStatus={soundStatus}
          startListening={handleListenButton}
          disable={isRecording}
        />
      </div>
    </div>
  );
}
