<<<<<<< HEAD
export default function PitchGraph() {
  return <></>;
=======
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
>>>>>>> develop-front
}

export default function PitchGraph({moviePitchList, myPitchList}: PitchDataList) {
  return (
    <>
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
    </>
  );
}