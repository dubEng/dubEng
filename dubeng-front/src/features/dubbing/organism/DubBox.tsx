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

export default function DubBox() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [soundStatus, setSoundStatus] = useState<SoundType>(SoundType.DEFAULT);

  const [recording, setRecording] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // 브라우저 호환성 체크
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState<
    boolean | null
  >(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    // sets to true or false after component has been mounted
    setSpeechRecognitionSupported(browserSupportsSpeechRecognition);
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        setRecording(false);
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);
        SpeechRecognition.stopListening();
      };
    })();
  }, []);

  if (speechRecognitionSupported === null) {
    return null; // return null on first render, can be a loading indicator
  }

  if (!speechRecognitionSupported) {
    return <span>Browser does not support speech recognition.</span>;
  }

  function handlePlayButton() {
    setIsPlaying(!isPlaying);
  }
  function handleRecordButton() {
    setIsRecording(!isRecording);
  }
  function handleListenButton() {
    if (soundStatus === SoundType.DEFAULT) {
      setSoundStatus(SoundType.PLAYING);
    } else {
      setSoundStatus(SoundType.DEFAULT);
    }
  }

  function handleStartButton(recordingTime: number) {
    // 스크립트 리셋
    resetTranscript();

    // STT 시작
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });

    // 녹음 시작
    setRecording(true);
    audioChunksRef.current = [];
    mediaRecorderRef.current?.start();

    // 지정 시간 후 녹음 종료
    setTimeout(() => {
     mediaRecorderRef.current?.stop();
    }, recordingTime);
  }

  function handleStopButton() {
    SpeechRecognition.stopListening();
    if(mediaRecorderRef.current?.state == "recording"){
      mediaRecorderRef.current.stop();
    }
  }

  const sendRecording = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("recording", blob, "recording.wav");

    const response = await fetch("/api/recordings", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };

  const playRecording = () => {
    const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
  };

  return (
    <div className="w-359 h-420 relative">
      <div>
        <div>
          <button onClick={() => handleStartButton(3000)} disabled={recording}>
            Start
          </button>
        </div>
        <div>
          <button onClick={handleStopButton}>Stop</button>
        </div>
        <div>
          <button onClick={resetTranscript}>Reset</button>
        </div>
        <div>
          <button onClick={playRecording} disabled={!audioBlob}>
            Play Recording
          </button>
        </div>
        <br />
        <div>STT 마이크 상태: {listening ? "듣는 중" : "안 듣는 중"}</div>
        <div>실시간 STT 결과: {transcript}</div>
        <div>녹음 상태: {recording ? "Recording..." : "not Recording"}</div>
      </div>
      <div className="flex justify-evenly">
        <PlayButton isPlaying={isPlaying} onClick={handlePlayButton} />
        <RecordButton isRecording={isRecording} onClick={handleRecordButton} />
        <ListenButton soundStatus={soundStatus} onClick={handleListenButton} />
      </div>
    </div>
  );
}
