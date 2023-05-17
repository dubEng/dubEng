import {Suspense, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import SignUpButton from "@/features/signup/atoms/SignUpButton";
import CommonInputBox from "@/components/atoms/CommonInputBox";
import useSignupPost from "@/apis/signup/mutations/useSignupPost";
import { Canvas, useLoader, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Stats,Html,ContactShadows,Plane } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import CheckMessage from "@/components/atoms/CheckMessage";
import { CheckMessageStatus } from "@/enum/statusType";
export interface SignupInfo{
    accessToken : string;
    nickname : string;
    categories : number[];
    introduce: string;
    kitchenName : string;
    gender : boolean;
    profileImgUrl: string;
}
export default function kitchen(){
    const [nextBtnStatus, setNextBtnStatus] = useState<boolean>(false);
    const [kitchenName, setKitchenName] = useState<string>("");
    const mutation = useSignupPost();
    const route = useRouter();
    const KITCHENNAME_LIMIT_SIZE = 15;
    const [checkKitchenMsg, setCheckKitchenMsg] = useState<CheckMessageStatus>(CheckMessageStatus.INIT);
    //Redux
    const { nickname, accessToken, interest, introduce, gender, imageUrl} = useSelector((state: RootState) => state.signupInfo);

    useEffect(()=>{
        setKitchenName(kitchenName);
        checkKitchenName(kitchenName);
    }, [kitchenName])

    const checkKitchenName = (kitchenName : string)=>{
        
        if(!kitchenName || kitchenName.length < 1 || kitchenName.length > 15){
            setNextBtnStatus(false);
            setCheckKitchenMsg(CheckMessageStatus.KITCHENNAME_LIMIT_FIFTEEN)
            return;
        }
        setCheckKitchenMsg(CheckMessageStatus.INIT);
        setNextBtnStatus(true);
    }
    //kitchenName Input Event
    const kitchenInputHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setKitchenName(e.target.value);
    }

    const singupNextHandler = async () =>{
        const signupInfo:SignupInfo = {
            nickname : nickname,
            accessToken : accessToken,
            categories : interest,
            introduce : introduce,
            kitchenName : kitchenName,
            gender : gender,
            profileImgUrl : imageUrl,
        }
        
        // POST 요청
        try{
            const result = await mutation.mutateAsync(signupInfo);
            if(result === 'success'){
                route.push('/login/success');
            }
            
        }catch(error){
            route.push('/login');
        }
    }
    return (
        <div className="container mx-auto">
            <div className="m-16 mt-100">
                <div className="my-40 grid">
                    <div className="my-20">
                        <p className="font-bold mb-6">나의 부엌 이름을 지어주세요!</p>
                        
                        {/* three.js */}
                        <div className="h-350 rounded-10">
                            <Canvas camera={{position: [1.625,2.4665,2.516] }} id="Mycanvas" style={{borderRadius : 10, border: '1px solid #F5F6F8'}}>
                                <Suspense fallback={null}>
                                    <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0.1,0.1,0.1]}>
                                    <meshStandardMaterial color="#FFB679" />
                                    </Plane>
                                    <Model url="/assets/b2.glb" height={300} width={350}/>
                                </Suspense>
                                <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
                                {/* <OrbitControls makeDefault dampingFactor={0.9} minDistance={5} maxDistance={20}
                                    minAzimuthAngle={-Math.PI/4} maxAzimuthAngle={Math.PI/4} minPolarAngle={0} maxPolarAngle={Math.PI/3}  /> */}
                                <ambientLight intensity={0.3} color={'#FFA07A'} /> 
                                <pointLight position={[4, 1.75, 0.7]} intensity={1.7} color={'#FFAFA7'}/>
                                <pointLight position={[0.7, 1.1, 0.4]} intensity={0.8} color={'#FFFACD'} />
                                <pointLight position={[0.5, 1.7, -1]} intensity={1.5} color={'#FFAFA7'} />  
                            </Canvas>
                        </div>
                        <div className="mt-10">
                            <CommonInputBox type="text" placeholder="귀여운 이름을 지어주세요." name="" value={kitchenName} onChange={kitchenInputHandler} />
                            <p className="text-right text-xs text-dubgray">{kitchenName.length}/{KITCHENNAME_LIMIT_SIZE}</p>
                            <CheckMessage status={checkKitchenMsg}/>
                        </div>
                    </div>
                </div>
                <div className="mt-60">
                    <SignUpButton onClick={singupNextHandler} text="회원가입 완료" status={nextBtnStatus}/>
                </div>
            </div>
        </div>
    )
}


interface ModelThree {
    url : string;
    width : number;
    height : number;
}
function Model({url, width, height} : ModelThree) {
    const gltf = useLoader(GLTFLoader, url);
    const { camera } = useThree();// camera var
  
    return (
      <group>
        <primitive object={gltf.scene} />
      </group>
    );
  }