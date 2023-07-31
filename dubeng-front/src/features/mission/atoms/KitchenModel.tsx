import React, {useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { MyMissionForm } from '@/pages/mission';

export interface Model{
    url : string;
    missionList : Array<string>;
    missionYet : Array<string>;
    missionClear : Array<string>;
    getData : Array<MyMissionForm>;
}

export default function KitchenModel({ url, missionClear, missionYet, getData }: Model) {
  
    const gltf:any = useLoader(GLTFLoader, url);// model load var
    const { camera }:any = useThree();// camera var
    const [isZoom, setIsZoom] = useState<boolean>(false);// state of zoom check 
    
    useEffect(()=>{
        gltf.scene.traverse((child:THREE.Object3D) => {// all object's child checking ...           
          for (let i = 0; i < missionYet.length; i++) {
            if (child.name.includes(missionYet[i])) {
              child.visible = false;
            }
          }
        });
        
    },[missionYet]);

    // 클릭  >> 줌
    function focusCameraOnObject(object:THREE.Object3D<THREE.Event>) {
  
      const cc:THREE.Vector3 = new THREE.Vector3().copy(camera.position);// my cam vec3 cp
      const target:THREE.Vector3 = new THREE.Vector3().copy(object.position);// clicked object vector cp 
      const R :number = 0.4*1.618; // 반지름 설정  황금비!
  
      const x0:number = target.x;
      const y0:number = target.y;
      const z0:number = target.z;
      
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
      camera.lookAt(new THREE.Vector3(-0.55, 1.0, -0.55));
      let num:number = 0;// frame counter
      function animate():void {// 1 frame == 1 animate 
        num++;
        if(camera.position.distanceTo(closestPoint) < 0.01 || num>20) {
          camera.lookAt(object.position);
          return;
        }
        
        camera.position.lerp(closestPoint, 0.7);

        requestAnimationFrame(animate);
      }
      // 애니메이션 시작
      animate();
    }// func end
    
    function focusCameraOnBase(camera: any) {// back to the base point from zoom point 
      const target:THREE.Vector3 = new THREE.Vector3(1.1413,3.0704,1.95585);
  
      camera.lookAt([-0.55, -0.61, -0.55]);
      let num:number = 0;
      function animate2():void{
        num++;
        if (camera.position.distanceTo(target) < 0.001|| num>20) {
          return;
        }
        camera.position.lerp(target, 1);// animate point ,speed 
        requestAnimationFrame(animate2);
      }
      animate2();
    }//func end

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {// click event handler
      

      console.log(" res of liersAND FAILCHECK"+ "now cam is"+camera.position.x+" y= "+camera.position.y+"z= "+camera.position.z);
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
              
            camera.lookAt(selected);
            
            function checkname():void {
              for (let qq = 0; qq < missionClear.length; qq++){
                let tempstr:string = missionClear[qq];
                if(selected.name.includes(missionClear[qq])) {// check my fin mission and load asset
                  if(isZoom == false) {// zoom it 
                    setIsZoom(true);
                    focusCameraOnObject(selected);
                    let flag2: boolean = false;
                    for (let k = 0; k < getData.length; k++){
                      let str:MyMissionForm = getData[k];
                      const missionElement:Element|null = document.querySelector("#mission");
                      const descElement:Element|null = document.querySelector("#desc");
                      if (document != null && missionElement != null && descElement != null) {
                        missionElement.innerHTML = '<a>' + str.title + '</a>';
                        descElement.innerHTML = '<a>' + str.assets + '을 얻었습니다.</a>';
                        flag2 = true;
                        break;
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
                  }
                  break;
                }else{
                  setIsZoom(false);
                  focusCameraOnBase(camera);
                  
                  if (document.querySelector("#helper") != null) {
                    const helperElement: HTMLElement | null = document.querySelector("#helper");
                    if (helperElement !== null) {
                      helperElement.style.opacity = '0';
                    }
                  }

                }
              }
            }
            checkname();
          }
        }
      };
    return (
      <primitive object={gltf.scene} onClick={handleClick}/>
    );
}