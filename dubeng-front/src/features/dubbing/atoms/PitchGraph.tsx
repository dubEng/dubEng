import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { ApexOptions } from "apexcharts";

const options: ApexOptions = {
  chart: {
    height: 350,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

const series = [
  {
    name: "내 녹음",
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: "원본 영상",
    data: [11, 32, 45, 32, 34, 52, 41],
  },
];

export default function PitchGraph() {
  return (
    <div className="mixed-chart">
      {typeof window !== "undefined" && (
        <Chart options={options} series={series} type="area" width={500} />
      )}
    </div>
  );
}
