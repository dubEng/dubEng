import React, { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import axios from "axios";
import useMissionListQuery from '@/apis/mission/queries/useMissionListQuery';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

export interface Model{
    url : string;
    Rayss : boolean;
    myHeight : number;
    myWidth : number;
}
interface MyMissionForm{
    videoId: number;
    title: string;
    assets: string;
    color: string;
    isComplete: boolean;
}
export default function KitchenModel({ url, Rayss }: Model) {
  
    const gltf:any = useLoader(GLTFLoader, url);// model load var
    const [selectedObject, setSelectedObject] = useState<any>(null);// raycasting object var
    const { camera }:any = useThree();// camera var
    const [isZoom, setIsZoom] = useState<boolean>(false);// state of zoom check 
    const [isAni, setIsAni] = useState<boolean>(false); // animation activate checker 

    const [lier, setlier]= useState(false);

    const [missionList, setMissionList] = useState<Array<string>>([]);
    const [missionYet, setMissionYet] = useState<Array<string>>([]);
    const [missionClear, setMissionClear] = useState<Array<string>>([]);

    const { accessToken } = useSelector((state: RootState) => state.user);
    const {data} = useMissionListQuery('BrtlK8huUt56j9LcUI5rlRS2gE7vp-2y4Lw2aMXPCj10lwAAAYgmTrMk');
    // console.log(data);
    
    useEffect(()=>{
      
      data.forEach((s:MyMissionForm)=>{  
        if(!s.isComplete){
          setMissionYet([...missionYet, s.assets]);
        }else{
          setMissionClear([...missionClear, s.assets]);
        }       
          getData.push(s);
          // getData.forEach((s:MyMissionForm)=>{
          //   if (s.isComplete) {
          //     missionList.push( s.assets);
          //   }
          // });
      });
    },[data]);
    //const MissionList = ['FRG','TABLE','CHAIR','OVEN','CABIMAIN','SINK','CABINET','LEFTSHELVE','SHELVE','cfm'];//success list
    // const MissionList:Array<string> = [];//success list
    // const missionYet:Array<string> = [];// need list 
    // const missionClear:Array<string> = [];//elements
    // API CALL arrays 
  
    let getData:Array<MyMissionForm> = [];// axios get mission data 
  
    async function ApiDataInit() {// before we rendered initiate first 
      //  const {data} = await axios.get('http://localhost:9000/user/mission/list', {
      //   headers: {
      //     accessToken:'BrtlK8huUt56j9LcUI5rlRS2gE7vp-2y4Lw2aMXPCj10lwAAAYgmTrMk',
      //   }
      // });
      

      
  
      for (let ii:number = 0; ii < missionClear.length; ii++){
        let flag:boolean = true;
        for (let jj:number = 0; jj < missionList.length; jj++){
          if (missionList[jj] == missionClear[ii]) {
            
            flag = false;// comp mission exist 
          }
        }
        if (flag) { 
          
          missionYet.push(missionClear[ii]);// yet mission added
        }
      }// catching not fin mission to list
  
      console.log("mymission= " + missionList);
      console.log("YET= " + missionYet);
      }
      
  
  
    async function a(){
      await ApiDataInit();
      
    if (!isZoom) {// not zoom state 
      console.log("TEST async");
      gltf.scene.traverse((child:THREE.Object3D) => {// all object's child checking ... 
        console.log("yet check"+ missionYet);
        missionYet.forEach((mission : string) => {
          console.log("TEST@@@@@@@@@@@@@@@@@");
          if (child.name.includes(mission)) {
            child.visible = false;
          }
        });
  
        if (child.name == 'raycast1') {// not important here 
          console.log(child.name + ' NAME check');
          child.raycast = ( raycaster:THREE.Raycaster, intersects: Array<THREE.Intersection<THREE.Object3D<THREE.Event>>>) => {// raycast apply 
            if (intersects.length > 0) {
              const selected:THREE.Object3D<THREE.Event> = intersects[0].object;// rays first matching object registered
              setSelectedObject(selected);//setting obj
              
            }
          };
        }
      });
    }
      
      
      
     }
  
    
    a();
  
  
    function focusCameraOnObject(object:THREE.Object3D<THREE.Event>) {// zoom animation function 
  
      const cc:THREE.Vector3 = new THREE.Vector3().copy(camera.position);// my cam vec3 cp
      const target:THREE.Vector3 = new THREE.Vector3().copy(object.position);// clicked object vector cp 
      const R :number = 0.4*1.618; // 반지름 설정  황금비!
  
      const x0:number = target.x;
      const y0:number = target.y;
      const z0:number = target.z;
      // const equation = `(x-${x0})^2 + (y-${y0})^2 + (z-${z0})^2 = ${R * R}`; formula of circle 3-demension
  
      let closestPoint : THREE.Vector3;
      let minDist:number = Infinity;
  for (let x = x0 - R; x <= x0 + R; x=x+0.01) {
    for (let y = y0 - R; y <= y0 + R; y=y+0.01) {
      for (let z = z0 - R; z <= z0 + R; z=z+0.01) {
        const dist:number = new THREE.Vector3(x, y, z).distanceTo(cc);
        if (dist < minDist) {
          closestPoint = new THREE.Vector3(x, y, z);
          minDist = dist;
        }
      }
    }
  }
      // origin code is catching a middle point each vectors but closest point is better than this now 
  
      //const middlePoint = new THREE.Vector3((cc.x + target.x) / 2, (cc.y + target.y) / 2, (cc.z + target.z) / 2);// middle point calculate
      //let middlePoint = closestPoint;// test code 
      camera.lookAt(object.position);
      let num:number = 0;// frame counter
        function animate():void {// 1 frame == 1 animate 
          if (camera.position.distanceTo(closestPoint) < 0.01|| num>20) {
            num++;
            console.log("ani1 end"+ setIsAni);
            setIsAni(false);
            return;
          }
          
          camera.position.lerp(closestPoint, 0.7);
  
          requestAnimationFrame(animate);
        }
          // 애니메이션 시작
          setIsAni(true);// because of mouse act lock 
          animate();
        //console.log("cam focused coord is = "+ camera.position.x+" "+ camera.position.y+" "+ camera.position.z+" md = "+middlePoint.x)
    }// func end
    
  
    function focusCameraOnBase(camera: any) {// back to the base point from zoom point 
  
        const cc:THREE.Vector3 = new THREE.Vector3().copy(camera.position);// get cur cam vec3 
        //const target = new THREE.Vector3(2.17,2.617,1.986);// origin cambase code 
        const target:THREE.Vector3 = new THREE.Vector3(1.1413,3.0704,1.95585);
  
      camera.lookAt([0, 0, 0]);
      let num:number = 0;
        function animate2():void{
          num++;
          if (camera.position.distanceTo(target) < 0.001|| num>20) {
            setIsAni(false);
            console.log(isZoom + "is zoom ani2 state");
            return;
          }
          camera.position.lerp(target, 1);// animate point ,speed 
          requestAnimationFrame(animate2);
        }
          // 애니메이션 시작
          setIsAni(true);// 
          animate2();
        //console.log("cam focused coord is = "+ camera.position.x+" "+ camera.position.y+" "+ camera.position.z+" md = "+middlePoint.x)
    }
    //func end 
    const handleClick = (e:MouseEvent) => {// click event handler 
      
      if (Rayss === true) { // if raytrace mode activated not action here  
        return;
      }
      console.log("click and raystate = "+Rayss);
        
        //React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLCanvasElement>> 
        const canvas: Element | null = document.querySelector('#Mycanvas');
        if (canvas != null) {
          const rect:DOMRect = canvas.getBoundingClientRect();
          const mouse: THREE.Vector2 = new THREE.Vector2();
          mouse.x = (e.clientX - rect.left) / canvas.clientWidth * 2 - 1;
          mouse.y = -(e.clientY - rect.top) / canvas.clientHeight * 2 + 1;
          const raycaster:THREE.Raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, camera);
          const intersects:any  = raycaster.intersectObjects(gltf.scene.children, true);// 이거 타입 뭐임??
  
          if (intersects.length> 0) {
              const selected:THREE.Object3D = intersects[0].object;
              const position:THREE.Vector3  = new THREE.Vector3();
              position.setFromMatrixPosition(selected.matrixWorld);
              console.log(selected.name + ' Selected Object Position:', position);
      
              camera.lookAt(selected);
              console.log(camera.position.x + "cam pos is here@"+camera.position.y+"z= "+camera.position.z);
      
              function checkname():void {
                setlier(false);
                for (let qq = 0; qq < missionList.length; qq++){
                  console.log(selected.name + "nameofsels");
                  if (selected.name.includes(missionList[qq])) {// check my fin mission and load asset
      
                      setlier(true);
                    if (selected.name.includes('bg')) {// not activated but..? 
                      setlier(false);
                    }
                  }
      
                }
                console.log(lier + " res of liers"+ "now cam is"+camera.position.x+" y= "+camera.position.y+"z= "+camera.position.z);
              }
              checkname();
      
              if (lier === true && isZoom == false ) {// zoom it 
                console.log("true ACT!");
                setIsZoom(true);
                focusCameraOnObject(selected);
      
                let flag2:boolean = false;
      
      
      
                  for (let j = 0; j < missionClear.length; j++){
                    if (selected.name.includes(missionClear[j])){
                        for (let k = 0; k < getData.length; k++){
                            let str:MyMissionForm = getData[k];
                            if (str.assets === missionClear[j]) {
                                
                              const missionElement:Element|null = document.querySelector("#mission");
                              const descElement:Element|null = document.querySelector("#desc");
                                if (document != null && missionElement != null && descElement != null) {
                                  missionElement.innerHTML = '<a>' + str.title + '</a>';
                                  descElement.innerHTML = '<a>' + str.assets + '을 얻었습니다.</a>';
                                  flag2 = true;
                                  break;
                                    
                            }
                           
                        }
                      }
                    }
                  }
      
                  if (!flag2) {
                    
                      const missionElement:Element|null = document.querySelector("#mission");
                      const descElement:Element|null = document.querySelector("#desc");
                      if (document != null && missionElement != null && descElement != null) {
                          missionElement.innerHTML = '<a>'+ 'MissionTitle'+'</a>';
                          descElement.innerHTML = '<a>'+'도전과제를 달성하여 주방을 꾸며주세요!'+'</a>';
                            
                    }
                
                  }
                  if (document.querySelector("#helper") != null) {
                      const helperElement: HTMLElement | null = document.querySelector("#helper");
                      if (helperElement !== null) {
                          helperElement.style.opacity = '0.7';
                        }
                  }
                
  
  
                // add api elements write here 
              }
              else {// reset cam coord 
      
      
                focusCameraOnBase(camera);
                setIsZoom(false);
                console.log(isAni + "else part ani checker");
                console.log(lier + " res of liersAND FAILCHECK"+ "now cam is"+camera.position.x+" y= "+camera.position.y+"z= "+camera.position.z);
               // let tempv = camera.getWorldDirection().Vector3;
               // console.log( tempv+ "direction of cam");
                // document.querySelector("#mission").innerHTML = '<a>업적 Helper</a>';
                // document.querySelector("#desc").innerHTML = '<p>원하는 오브젝트를 클릭해주세요!</p>';
                if (document.querySelector("#helper") != null) {
                  const helperElement: HTMLElement | null = document.querySelector("#helper");
                  if (helperElement !== null) {
                      helperElement.style.opacity = '0';
                    }
              }
              }
      
            }
  
        }
  
   // at browser mouse cursor coordination value must normalization
  
      //  mouse.X = (e.clientX - rect.left) / rect.width;
      //  mouse.Y = (e.clientY - rect.top) / rect.height;  
  
  
  
      };
  
  
      
      return (
          <primitive object={gltf.scene} onClick={handleClick} />
          // <primitive object={gltf.scene} />
        );
      
}