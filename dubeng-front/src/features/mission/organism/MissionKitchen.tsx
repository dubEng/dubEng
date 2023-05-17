import React, { Suspense, useState } from 'react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls,ContactShadows,Plane } from '@react-three/drei';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass.js';
import KitchenModel from '../atoms/KitchenModel';
import KitchenTooltipBox from '../atoms/KitchenTooltipBox';
extend({ EffectComposer, RenderPass, UnrealBloomPass , ShaderPass, SSAOPass, SSRPass });
export default function MissionKitchen() {
     //미션 목록을 불러옵니다. API 요청이 들어갈 부분
  
    const [rayTracing, setRayTracing] = useState(false);
    const [mywidth, setMyWidth] = useState(350);
    const [myheight,setMyHeight] = useState(300);
  
    return (
        <Canvas id="Mycanvas" camera={{position: [1.1413,3.0704,1.95585] }} style={{borderRadius : 10, border: '1px solid #F5F6F8'}}>
            <Suspense fallback={"로딩중"}>
                <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0.1,0.1,0.1]}>
                    <meshStandardMaterial color="#FFB679" />
                </Plane>
                <KitchenModel url="/assets/FinalModel.glb" Rayss={rayTracing} myHeight={300} myWidth={350}/>
                {/* <KitchenTooltipBox /> */}
            </Suspense>
            <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
            <OrbitControls makeDefault dampingFactor={0.9}
                                    minAzimuthAngle={-Math.PI/4} maxAzimuthAngle={Math.PI/4} minPolarAngle={0} maxPolarAngle={Math.PI/3}  />
            {/* <KitchenFilterEffect /> */}
            <ambientLight intensity={0.3} color={'#FFA07A'} /> 
            <pointLight position={[4, 1.75, 0.7]} intensity={1.7} color={'#FFAFA7'}/>
            <pointLight position={[0.7, 1.1, 0.4]} intensity={0.8} color={'#FFFACD'} />
            <pointLight position={[0.5, 1.7, -1]} intensity={1.5} color={'#FFAFA7'} />  
            {/* <ambientLight intensity={1.3} color={'red'} />  */}
        </Canvas>
    )
//   const canvas = useMemo(() => (
//     <div id="threeDiv"  style={{ width: mywidth, height: myheight ,backgroundColor:'black'}}>
//     <button onClick={() => setRayTracing(!rayTracing)}>
//         {rayTracing ? 'Ray Tracing OFF' : 'Ray Tracing ON'}
//     </button>
//     {rayTracing ? (
//             <Canvas camera={{ position: [10, 10, 5] }} gl={renderer}>
//                 <Suspense fallback={null}>
//                     <Raytracer toneMapping={THREE.ACESFilmicToneMapping}>
//                     <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]}  position={[0.1,0.1,0.1]}>
//                         <meshStandardMaterial color="#FFB679" />
//                     </Plane>
//                     <KitchenModel url="/assets/b2.glb" Rayss={rayTracing} myHeight={myheight} myWidth={mywidth} />
//                     {/* <pointLight position={[4, 1.75, 0.7]} intensity={5} color={'#FFAFA7'}  /> */}
//                     {/* <pointLight position={[0.7, 1.1, 0.4]} intensity={20} color={'#FFFACD'} target={[0,0,0]} />
//                     <pointLight position={[0.5, 1.7, -1]} intensity={50} color={'#FFA07A'} />   */}
//                     </Raytracer>
//                 </Suspense>
//             <OrbitControls  zoomSpeed={0.9} makeDefault dampingFactor={0.9} minDistance={5} maxDistance={20} />
//             <Stats /> 
//           </Canvas> // raytrace model
//     ) : (
//         <Canvas camera={{position: [1.1413,3.0704,1.95585] }} gl={renderer} id="Mycanvas">
//         <Suspense fallback={null}>
//             <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0.1,0.1,0.1]}>
//                 <meshStandardMaterial color="#FFB679" />
//             </Plane>
//             <KitchenModel url="http://localhost:5500/src/ori3.glb" Rayss={rayTracing} myHeight={myheight} myWidth={mywidth}/>
//             <KitchenTooltipBox />
//         </Suspense>
//         <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
//         <OrbitControls  />
//         <KitchenFilterEffect />
//         <ambientLight intensity={0.3} color={'#FFA07A'} /> 
//         <pointLight position={[4, 1.75, 0.7]} intensity={1.7} color={'#FFAFA7'}/>
//         <pointLight position={[0.7, 1.1, 0.4]} intensity={0.8} color={'#FFFACD'} />
//         <pointLight position={[0.5, 1.7, -1]} intensity={1.5} color={'#FFAFA7'} />  
//         <ambientLight intensity={1.3} color={'red'} /> 
//         </Canvas>
//     )}
//     </div>
//   ), [rayTracing]);
    
  
  
  
    // return canvas;
  }