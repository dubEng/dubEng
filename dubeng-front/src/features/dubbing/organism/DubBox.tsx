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
import PlayBar from "../atoms/PlayBar";
// import { useSwiperSlide } from "swiper/react";

export default function DubBox({
  duration,
  content,
  translateContent,
  pitchList,
  scriptLength,
  scriptIndex,
  youtubePlayer,
  speechToText,
  setSpeechToText,
  setTimerId,
  timerId,
  addRecordingBlobList
}: Script) {
  // const swiperSlide = useSwiperSlide();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [soundStatus, setSoundStatus] = useState<SoundType>(SoundType.DISABLE);

  const [answer, setAnswer] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaStreamRef = useRef<any>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [myPitchList, setMyPitchList] = useState<number[]>([]);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

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

        addRecordingBlobList(scriptIndex, audioBlob);

        SpeechRecognition.stopListening();
      };
    })();
  }, []);

  useEffect(() => {
    setSpeechToText(transcript);
    onMatching(transcript);

    // 스크립트 리셋
    resetTranscript();
  }, [listening]);

  function handleScriptPlayButton() {
    setIsPlaying(true);
    youtubePlayer.playVideo();

    const timerId = window.setTimeout(() => {
      youtubePlayer.pauseVideo();
      setIsPlaying(false);
    }, duration);

    setTimerId(timerId);
  }

  function handleScriptStopButton() {
    setIsPlaying(false);

    // 기존에 타이머가 동작중이었을 경우 clear
    window.clearTimeout(timerId);
    youtubePlayer.pauseVideo();
  }

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
    <div className="w-359 h-370 bg-white rounded-20 container mx-auto p-16">
      <div className="flex justify-between">
        <p className="text-12 text-dubblack font-normal">
          {scriptIndex}/{scriptLength}
        </p>
      </div>
      <div className="flex justify-center">
        <PitchGraph moviePitchList={pitchList} myPitchList={myPitchList} />
      </div>
      <p className="text-14 text-dubblack font-normal flex justify-start mx-16">
        {content}
      </p>
      <p className="text-14 text-dubgray font-normal flex justify-start mx-16">
        {translateContent}
      </p>
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
        {duration / 1000}초
      </p>
      <div className="mb-16 mx-16">
        <PlayBar />
      </div>
      <div className="flex justify-evenly">
        <PlayButton
          isPlaying={isPlaying}
          playVideo={handleScriptPlayButton}
          stopVideo={handleScriptStopButton}
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
