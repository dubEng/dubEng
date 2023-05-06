import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { ApexOptions } from "apexcharts";
import { PitchDataList } from "@/types/PitchDataList";

const options: ApexOptions = {
  chart: {
    height: 125,
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
}

export default function PitchGraph({moviePitchList, myPitchList}: PitchDataList) {

  // const analyzeMicrophone = () => {
  //   const audioCtx = new AudioContext();
  //   const analyser = audioCtx.createAnalyser();
  //   analyser.fftSize = 4096;
  //   const dataArray = new Uint8Array(analyser.frequencyBinCount);
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true })
  //     .then((mediaStream) => {
  //       const source = audioCtx.createMediaStreamSource(mediaStream);
  //       source.connect(analyser);
  //       const recordingTimer = setInterval(() => {
  //         analyser.getByteFrequencyData(dataArray);
  //         const maxIndex = dataArray.indexOf(Math.max(...dataArray));
  //         const maxHz = (maxIndex * audioCtx.sampleRate) / analyser.fftSize;
  //         console.log('maxHz', maxHz);
  //         setData((data) => [...data, maxHz]);
  //       }, 500);
  //       setTimeout(() => {
  //         clearInterval(recordingTimer);
  //         mediaStream.getTracks().forEach((track) => track.stop());
  //       }, 5000);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  return (
    <div className="mixed-chart">
      {typeof window !== "undefined" && (
        <Chart
          options={options}
          series={[
            {
              data: moviePitchList
            },
            {
              data: myPitchList,
            },
          ]}
          type="area"
          width={303}
          height={125}
        />
      )}
    </div>
  );
}