import MissionList from "@/features/mission/organism/MissionList";
import React, { Suspense } from 'react';

import { Canvas,ReactThreeFiber,Props, extend, useLoader, useThree,  } from '@react-three/fiber';
import { OrbitControls, Stats,Html,ContactShadows,Plane, Gltf } from '@react-three/drei';

import KitchenModel from "@/features/mission/atoms/KitchenModel";
import KitchenTooltipBox from "@/features/mission/atoms/KitchenTooltipBox";
import MissionKitchen from "@/features/mission/organism/MissionKitchen";

export default function MissionPage() {
  return (
    <div className="container mx-auto h-screen bg-white mt-57 mb-61">
      <p className="flex justify-start mx-16 text-19 font-bold mt-24 mb-16">
        나의 주방
      </p>
      <div className="h-350 rounded-10 mx-20">
        <MissionKitchen/> 
      </div>
      <p className="flex justify-start mx-16 text-19 font-bold mt-24 mb-16">
        도전과제
      </p>
      <MissionList />
    </div>
  );
}