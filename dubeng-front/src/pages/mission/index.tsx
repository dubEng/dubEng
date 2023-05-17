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
  const { accessToken } = useSelector((state: RootState) => state.user);
  const {data} = useMissionListQuery('7CRwLFZmgZb5k4FTuaS3zZA4sQrWggVumiKaoIuhCiolEQAAAYgqbhSP');
  const [missionList, setMissionList] = useState<Array<string>>([]);
  const [missionYet, setMissionYet] = useState<Array<string>>([]);
  const [missionClear, setMissionClear] = useState<Array<string>>([]);
  const [getData, setGetData] = useState<Array<MyMissionForm>>([]);
  useEffect(()=>{
    if(data){
        const tempYetArray : Array<string> = [];
        const tempClearArray : Array<string> = [];

        data.forEach((s:MyMissionForm)=>{  
          if(!s.isComplete){
            tempYetArray.push(s.assets);
          }else{
            tempClearArray.push(s.assets);
          }

        });
        setGetData(data);
        setMissionYet(tempYetArray);
        setMissionClear(tempClearArray);
    }
  },[data])
  return (
    <div className="container mx-auto h-screen bg-white mt-57 mb-61">
      <p className="flex justify-start mx-16 text-19 font-bold mt-24 mb-16">
        나의 주방
      </p>
      <div className="h-350 rounded-10 mx-20">
        <MissionKitchen url={"/assets/FinalModel.glb"}
          missionList={missionList}
          missionClear={missionClear}
          missionYet={missionYet}
          getData={getData}
        /> 
      </div>
      <p className="flex justify-start mx-16 text-19 font-bold mt-24 mb-16">
        도전과제
      </p>
      <MissionList />
    </div>
  );
}