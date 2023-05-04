"use client";

import "regenerator-runtime/runtime";
import ListenButton from "../atoms/ListenButton";
import PlayButton from "../atoms/PlayButton";
import RecordButton from "../atoms/RecordButton";
import { SoundType } from "../../../enum/statusType";

import { useEffect, useState } from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function DubBox() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [soundStatus, setSoundStatus] = useState<SoundType>(SoundType.DEFAULT);

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

  function handleStartButton() {
    SpeechRecognition.startListening();
  }

  function handleStopButton() {
    SpeechRecognition.stopListening();
  }

  return (
    <div className="w-359 h-420 relative">
      <div>
        <div>Microphone: {listening ? "듣는 중" : "안 듣는 중"}</div>
        <div>
          <button onClick={handleStartButton}>Start</button>
        </div>
        <div>
          <button onClick={handleStopButton}>Stop</button>
        </div>
        <div>
          <button onClick={resetTranscript}>Reset</button>
        </div>
        <div>{transcript}</div>
      </div>
      <div className="flex justify-evenly">
        <PlayButton isPlaying={isPlaying} onClick={handlePlayButton} />
        <RecordButton isRecording={isRecording} onClick={handleRecordButton} />
        <ListenButton soundStatus={soundStatus} onClick={handleListenButton} />
      </div>
    </div>
  );
}
