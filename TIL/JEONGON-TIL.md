오늘의 기획

- 23.04.11

  본선 발표 준비<br/>
  컨설턴트님/코치님 미팅<br/>
  산출물 작성<br/>

- 23.04.12

  본선 발표 준비<br/>
  컨설턴트님/코치님 미팅 (기획 확정 실패)<br/>
  산출물 작성 - 오픈소스의 활용 및 개발, 개발 일정 <br/>

- 23.04.13

  본선 발표<br/>
  기획 회의 <br/>

- 23.04.14

  기획 컨설턴트님 및 코치님 피드백<br/>
  기획 구체화 회의 <br/>

- 23.04.17

<h1>
실시간 pitch 출력하기
</h1>

```
import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const [pitch, setPitch] = useState(0);

  useEffect(() => {
    const audioContext = new AudioContext();
    const analyserNode = audioContext.createAnalyser();

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const sourceNode = audioContext.createMediaStreamSource(stream);
        sourceNode.connect(analyserNode);

        const updatePitch = () => {
          const data = new Uint8Array(analyserNode.fftSize);
          analyserNode.getByteFrequencyData(data);

          const maxIndex = data.indexOf(Math.max(...data));
          const frequency =
            (maxIndex * audioContext.sampleRate) / analyserNode.fftSize;
          const pitch = frequency;

          setPitch(pitch);
          requestAnimationFrame(updatePitch);
        };

        updatePitch();
      })
      .catch((error) => {
        console.error("getUserMedia error:", error);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Pitch: {pitch}</p>
    </main>
  );
}
```

<br/>

<h1>
Chart.js 그래프 테스트
</h1>

```
import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [1, 2, 3, 4, 5],
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [11, 21, 31, 41, 51],
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function Home() {
  const [pitch, setPitch] = useState(0);

  useEffect(() => {
    const audioContext = new AudioContext();
    const analyserNode = audioContext.createAnalyser();

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const sourceNode = audioContext.createMediaStreamSource(stream);
        sourceNode.connect(analyserNode);

        const updatePitch = () => {
          const data = new Uint8Array(analyserNode.fftSize);
          console.log("data", data);
          analyserNode.getByteFrequencyData(data);

          const maxIndex = data.indexOf(Math.max(...data));
          const frequency =
            (maxIndex * audioContext.sampleRate) / analyserNode.fftSize;
          const pitch = frequency;

          setPitch(pitch);
          requestAnimationFrame(updatePitch);
        };

        updatePitch();
      })
      .catch((error) => {
        console.error("getUserMedia error:", error);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Pitch: {pitch.toFixed(2)}</p>
      <Line options={options} data={data} />
    </main>
  );
}
```

- 23.04.18

<h1>
오디오 녹음 테스트
</h1>

```
import { useEffect, useRef } from 'react';

function AudioRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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
    })();
  }, []);

  function startRecording() {
    mediaRecorderRef.current?.start();
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
  }

  function downloadAudio() {
    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'recording.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  function playAudio() {
    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio();
    audio.src = url;
    audio.play();
  }

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={downloadAudio}>Download Audio</button>
      <button onClick={playAudio}>Play Audio</button>
    </div>
  );
}

export default AudioRecorder;
```

- 23.04.19

피그마 와이어 프레임 작업
중간 발표 자료 조사
chart.js 작업

- 23.04.20
 
컨설턴트님 발표 피드백 <br/>
피그마 와이 프레임 작업 1차 완료(모바일) <br/>
![image](https://user-images.githubusercontent.com/79705809/233404590-e06d290c-4f7b-4006-aa79-433a21aa0fdd.png)
