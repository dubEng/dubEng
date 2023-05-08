import DubBox from "@/features/dubbing/organism/DubBox";
import { useEffect, useRef, useState } from "react";

export default function CommunityPage() {
  // const [hzData, setHzData] = useState<number[]>([]);

  // const analyzeMicrophone = () => {
  //   const audioCtx = new AudioContext();
  //   const analyser = audioCtx.createAnalyser();
  //   analyser.fftSize = 2048;
  //   const dataArray = new Uint8Array(analyser.frequencyBinCount);
  //   navigator.mediaDevices.getUserMedia({ audio: true })
  //     .then((mediaStream) => {
  //       const source = audioCtx.createMediaStreamSource(mediaStream);
  //       source.connect(analyser);
  //       const audioChunks: number[] = [];
  //       const recordingTimer = setInterval(() => {
  //         analyser.getByteFrequencyData(dataArray);
  //         const maxIndex = dataArray.indexOf(Math.max(...dataArray));
  //         const maxHz = maxIndex * audioCtx.sampleRate / analyser.fftSize;
  //         audioChunks.push(maxHz);
  //       }, 10);
  //       setTimeout(() => {
  //         clearInterval(recordingTimer);
  //         mediaStream.getTracks().forEach(track => track.stop());
  //         setHzData(audioChunks);
  //       }, 5000);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  return (
    <div>
      {/* <button onClick={analyzeMicrophone}>Start</button>
      <ul>
        {hzData.map((hz, i) => (
          <li key={i}>{hz} Hz</li>
        ))}
      </ul> */}
    </div>
  );
}