import MissionList from "@/features/mission/organism/MissionList";
import MissionKitchen from "@/features/mission/organism/MissionKitchen";
import useMissionListQuery from '@/apis/mission/queries/useMissionListQuery';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { useEffect, useState } from "react";

export interface MyMissionForm{
  videoId: number;
  title: string;
  assets: string;
  color: string;
  isComplete: boolean;
}

export default function MissionPage() {
  const { accessToken, nickname } = useSelector((state: RootState) => state.user);
  const {data} = useMissionListQuery(accessToken);
  const [missionList, setMissionList] = useState<Array<string>>([]);
  const [missionYet, setMissionYet] = useState<Array<string>>([]);
  const [missionClear, setMissionClear] = useState<Array<string>>([]);
  const [getData, setGetData] = useState<Array<MyMissionForm>>([]);
  const [missionClearData, setMissionClearData] = useState<Array<MyMissionForm>>([]);
  useEffect(()=>{
    if(data){
        const tempYetArray : Array<string> = [];
        const tempClearArray : Array<string> = [];
        const tempDataArray : Array<MyMissionForm> = [];
        data.forEach((s:MyMissionForm)=>{  
          if(!s.isComplete){
            tempYetArray.push(s.assets);
          }else{
            tempClearArray.push(s.assets);
            tempDataArray.push(s);
          }

        });
        setGetData(data);
        setMissionYet(tempYetArray);
        setMissionClear(tempClearArray);
        setMissionClearData(tempDataArray);
    }
  },[data])
  return (
    <div className="container mx-auto h-screen bg-white mt-57 mb-61">
      <p className="flex justify-start mx-16 text-19 font-bold mt-24 mb-16">
        {nickname}님의 부엌
      </p>
      <div className="h-350 rounded-10 mx-20">
        <MissionKitchen url={"/assets/KITCHEN.glb"}
          missionList={missionList}
          missionClear={missionClear}
          missionYet={missionYet}
          getData={getData}
        /> 
      </div>
      <p className="flex justify-start mx-16 text-19 font-bold mt-24 mb-16">
        완료된 도전과제
      </p>
      <MissionList missionClearData={missionClearData}/>
    </div>
  );
}