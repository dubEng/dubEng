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

- 23.04.21
  <br/>

# PitchDetection

```
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>

    <title>Pitch Detection</title>
    <!-- <script src="http://localhost:8080/ml5.js" type="text/javascript"></script> -->
    <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
  </head>

  <body>
    <h1>Pitch Detection Example</h1>
    <button id="startButton">시작</button>
    <p id="status">Loading Model...</p>
    <p id="result">No pitch detected</p>
    <canvas id="pitchChart"></canvas>
    <!-- <script src="sketch.js"></script> -->
  </body>
  <script>
    var canvas = document.getElementById("pitchChart");
    var ctx = canvas.getContext("2d");

    // 차트 초기화
    var chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Pitch",
            data: [],
            borderColor: "rgb(255, 99, 132)",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Real-time Pitch Detection with ml5 and Chart.js",
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Time",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Pitch (Hz)",
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    let audioContext;
    let mic;
    let pitch;

    const startButton = document.getElementById("startButton");

    async function setup() {
      console.log("setup");
      audioContext = new AudioContext();
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      startPitch(stream, audioContext);
    }

    function startPitch(stream, audioContext) {
      console.log("startPitch");
      console.log("ml5", ml5);
      pitch = ml5.pitchDetection("./model/", audioContext, stream, modelLoaded);
      console.log("pitch", pitch);
    }

    function modelLoaded() {
      console.log("modelLoaded");
      document.querySelector("#status").textContent = "Model Loaded";
      pitch.getPitch(gotPitch);
      <!-- getPitch(); -->
    }

    // pitch 값을 가져왔을 때 호출되는 콜백 함수
    function gotPitch(error, frequency) {
      if (error) {
        console.error(error);
      } else {
        console.log(frequency);
        if (frequency < 500) {
          var time = new Date().toLocaleTimeString(); // 현재 시간
          chart.data.labels.push(time); // 레이블에 현재 시간 추가
          chart.data.datasets[0].data.push(frequency); // 데이터에 pitch 값 추가
          chart.update(); // 차트 업데이트
          pitch.getPitch(gotPitch); // 다음 pitch 값을 가져올 준비
        }
      }
    }

    startButton.addEventListener("click", async () => {
      try {
        await setup();
      } catch (error) {
        console.log("error");
      }
    });
  </script>
</html>
```

# STT

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>마이크 권한 요청</title>
</head>
<body>
  <button id="recordButton">녹음 시작</button>
  <div id="transcription"></div>

  <script>
    const transcription = document.getElementById('transcription');
    const recordButton = document.getElementById('recordButton');
    let recognition = null;

    // 마이크 권한 요청 함수
    function requestMicrophonePermission() {
      return navigator.mediaDevices.getUserMedia({ audio: true });
    }

    // 녹음 시작 함수
    function startRecording() {
      // 브라우저 호환성 체크
      if (!('webkitSpeechRecognition' in window)) {
        transcription.textContent = '이 브라우저는 음성 인식을 지원하지 않습니다.';
        return;
      }

      // 음성 인식 객체 생성
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      // 음성 인식 시작
      recognition.start();

      // 결과 이벤트 처리
      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        transcription.innerHTML = finalTranscript + '<span style="color: gray;">' + interimTranscript + '</span>';
      };

      // 에러 이벤트 처리
      recognition.onerror = (event) => {
        if (event.error === 'no-speech') {
          transcription.textContent = '마이크에서 소리가 감지되지 않았습니다.';
        }
        if (event.error === 'audio-capture') {
          transcription.textContent = '마이크에 접근할 수 없습니다.';
        }
        if (event.error === 'not-allowed') {
          transcription.textContent = '마이크 권한이 없습니다.';
        }
      };
    }

    // 이벤트 리스너 등록
    recordButton.addEventListener('click', async () => {
      try {
        await requestMicrophonePermission();
        startRecording();
      } catch (error) {
        transcription.textContent = '마이크 권한 요청이 거부되었습니다.';
      }
    });
  </script>
</body>
</html>
```
