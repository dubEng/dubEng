import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

const options: ApexOptions = {
  chart: {
    id: "pitchChart",
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  annotations: {
    points: [],
  },
};

const series = {
  name: "원본 영상 pitch",
  data: [
    31, 40, 28, 51, 42, 109, 100, 50, 31, 40, 28, 51, 42, 109, 100, 50, 31, 40,
    28, 51, 42, 109, 100, 50, 31, 40, 28, 51, 42, 109, 100, 50, 31, 40, 28, 51,
    42, 109, 100, 50, 31, 40, 28, 51, 42, 109, 100, 50, 31, 50,
  ],
};

export default function PitchGraph() {
  const [data, setData] = useState<number[]>([]);
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: { show: false },
    },
    yaxis: {
      show: false,
    },
  });

  const analyzeMicrophone = () => {
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 4096;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((mediaStream) => {
        const source = audioCtx.createMediaStreamSource(mediaStream);
        source.connect(analyser);
        const recordingTimer = setInterval(() => {
          analyser.getByteFrequencyData(dataArray);
          const maxIndex = dataArray.indexOf(Math.max(...dataArray));
          const maxHz = (maxIndex * audioCtx.sampleRate) / analyser.fftSize;
          console.log('maxHz', maxHz);
          setData((data) => [...data, maxHz]);
        }, 500);
        setTimeout(() => {
          clearInterval(recordingTimer);
          mediaStream.getTracks().forEach((track) => track.stop());
        }, 5000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="mixed-chart">
      <button onClick={analyzeMicrophone}>Start</button>
      {typeof window !== "undefined" && (
        <Chart
          options={options}
          series={[
            series,
            {
              data,
            },
          ]}
          type="area"
          width={500}
        />
      )}
    </div>
  );
}