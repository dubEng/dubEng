import ListenButton from "../atoms/ListenButton";
import PlayButton from "../atoms/PlayButton";
import RecordButton from "../atoms/RecordButton";
import { SoundType } from "../../../enum/statusType";

import { useState } from "react";

export default function DubBox() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [soundStatus, setSoundStatus] = useState<SoundType>(SoundType.DEFAULT);

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

  return (
    <div className="w-359 h-420 relative">
      <div className="flex justify-evenly">
        <PlayButton isPlaying={isPlaying} onClick={handlePlayButton} />
        <RecordButton isRecording={isRecording} onClick={handleRecordButton} />
        <ListenButton soundStatus={soundStatus} onClick={handleListenButton} />
      </div>
    </div>
  );
}
