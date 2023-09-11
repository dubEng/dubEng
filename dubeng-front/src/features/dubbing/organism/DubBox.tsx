"use client";
import "regenerator-runtime/runtime";
import ListenButton from "../atoms/ListenButton";
import PlayButton from "../atoms/PlayButton";
import RecordButton from "../atoms/RecordButton";
import { LangType, SoundType } from "../../../enum/statusType";

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

import Lottie from "react-lottie-player";
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
  langType,
  setTimerId,
  updateDubbingCompleteCheckList,
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

  const { mutateAsync } = useFileUploadPost();

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

        saveRecordingFile(audioBlob);

        //녹음 종료 후 1초뒤에 STT 인식 종료
        setTimeout(() => {
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

  async function saveRecordingFile(audioBlob: Blob) {
    const formData = new FormData();

    formData.append("recordInfo.nickname", nickname);
    formData.append("recordInfo.recordNum", scriptIndex.toString());
    formData.append("recordInfo.videoId", videoId);

    const file = new File([audioBlob], "myRecordingFile.wav", {
      type: "audio/wav",
    }); // File 객체 생성

    formData.append("audioFile", file);

    try {
      await mutateAsync(formData);
      updateDubbingCompleteCheckList(scriptIndex);
    } catch (e) {
      console.error("error:", e);
    }
  }

  function handleScriptPlayButton() {
    setIsPlaying(true);

    const time = youtubePlayer.getCurrentTime();
    // console.log('time', time);
    // console.log('startTime', startTime/1000);

    // if (time != startTime) {
    //   youtubePlayer.seekTo(startTime);
    //   await setTimeout(() => {}, 800);
    // }
    youtubePlayer.seekTo(startTime / 1000);
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
    setMyPitchList([]);
    analyzeMicrophone(mediaStreamRef.current);

    // 녹음 전 유튜브 영상 멈추기
    setIsPlaying(false);
    youtubePlayer.pauseVideo();

    // 녹음 시작하기
    startRecording(duration);
    youtubePlayer.seekTo(startTime / 1000);
    youtubePlayer.mute();
    youtubePlayer.playVideo();

    window.setTimeout(() => {
      youtubePlayer.pauseVideo();
      youtubePlayer.unMute();
    }, duration);
  }

  function handleListenButton() {
    setSoundStatus(SoundType.PLAYING);

    // 내 소리 듣기 전 유튜브 영상 멈추기
    setIsPlaying(false);
    youtubePlayer.pauseVideo();

    // 내 소리 듣기
    listenMyVoice();
    youtubePlayer.seekTo(startTime / 1000);
    youtubePlayer.mute();
    youtubePlayer.playVideo();

    window.setTimeout(() => {
      youtubePlayer.pauseVideo();
      youtubePlayer.unMute();
    }, duration);
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

  const analyzeMicrophone = (stream: MediaStream) => {
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 4096;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let previousValueToDisplay: number | null = null;
    let smoothingCount = 0;
    const smoothingThreshold = 10;
    const smoothingCountThreshold = 5;

    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    const recordingTimer = setInterval(() => {
      analyser.getByteTimeDomainData(dataArray);
      const pitch = autoCorrelate(dataArray, audioCtx.sampleRate);
      // console.log("pitch", Math.round(pitch));

      if (pitch === -1) {
        // console.log('Too quiet...');
        return;
      }

      let valueToDisplay = Math.round(pitch);
      if (
        previousValueToDisplay !== null &&
        Math.abs(valueToDisplay - previousValueToDisplay) < smoothingThreshold
      ) {
        if (smoothingCount < smoothingCountThreshold) {
          smoothingCount++;
          return;
        } else {
          previousValueToDisplay = valueToDisplay;
          smoothingCount = 0;
        }
      } else {
        previousValueToDisplay = valueToDisplay;
        smoothingCount = 0;
      }

      setMyPitchList((data) => [...data, valueToDisplay]);
    }, 50);

    setTimeout(() => {
      clearInterval(recordingTimer);
      // 아랫놈이 문제였다.
      // stream.getTracks().forEach((track) => track.stop());
    }, duration);
  };

  return (
    <div className="w-full bg-white rounded-20 container p-16">
      <div className="flex justify-between">
        <p className="text-12 text-dubblack font-normal h-25">
          {scriptIndex}/{scriptLength}
        </p>
        {langType === LangType.ENGLISH ? (
          <div className="flex justify-end items-center h-25">
            <span className="text-12 text-dubblack font-normal">번역</span>
            <Switch
              checked={koSubTitle}
              onChange={handleSubTitleSwitchChange}
            />
          </div>
        ) : null}
      </div>
      <div className="flex justify-center">
        <PitchGraph moviePitchList={[]} myPitchList={myPitchList} />
      </div>
      <p className="text-14 text-dubblack font-normal flex justify-start mx-16">
        {content}
      </p>
      {langType === LangType.ENGLISH ? (
        koSubTitle ? (
          <p className="text-14 text-dubgray font-normal flex justify-start mx-16">
            {translateContent}
          </p>
        ) : (
          <p className="text-14 text-dubgray font-normal flex justify-start mx-16 invisible">
            {translateContent}
          </p>
        )
      ) : null}
      {langType === LangType.ENGLISH ? (
        listening ? (
          <p className="text-14 text-dubblue font-normal flex justify-start h-34 mx-16 mb-16">
            {transcript}
          </p>
        ) : answer ? (
          <p className="text-14 text-[#0FA64B] font-normal flex flex-row justify-start items-center h-34 mx-16 mb-16">
            {speechToText}
            <Lottie
              loop
              path="/lottie/checked.json"
              play
              style={{ width: 35, height: 35 }}
            />
          </p>
        ) : (
          <p className="text-14 text-dubcoral font-normal flex justify-start h-34 mx-16 mb-16">
            {speechToText}
          </p>
        )
      ) : null}
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

  function autoCorrelate(buffer: Uint8Array, sampleRate: number) {
    const SIZE = buffer.length;
    const sumOfSquares = buffer.reduce((sum, val) => sum + val * val, 0);
    const rootMeanSquare = Math.sqrt(sumOfSquares / SIZE);

    if (rootMeanSquare < 0.01) {
      return -1;
    }

    let r1 = 0;
    let r2 = SIZE - 1;
    const threshold = 0.2;

    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < threshold) {
        r1 = i;
        break;
      }
    }

    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < threshold) {
        r2 = SIZE - i;
        break;
      }
    }

    buffer = buffer.slice(r1, r2);
    const newSize = buffer.length;

    const c = new Array(newSize).fill(0);

    for (let i = 0; i < newSize; i++) {
      for (let j = 0; j < newSize - i; j++) {
        c[i] += buffer[j] * buffer[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) {
      d++;
    }

    let maxValue = -1;
    let maxIndex = -1;
    for (let i = d; i < newSize; i++) {
      if (c[i] > maxValue) {
        maxValue = c[i];
        maxIndex = i;
      }
    }

    let T0 = maxIndex;

    const x1 = c[T0 - 1];
    const x2 = c[T0];
    const x3 = c[T0 + 1];

    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;

    if (a) {
      T0 -= b / (2 * a);
    }

    return sampleRate / T0;
  }
}
