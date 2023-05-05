import {useState, useEffect} from "react";
import SignUpButton from "@/features/signup/atoms/SignUpButton";

import CommonInputBox from "@/components/atoms/CommonInputBox";

export default function kitchen(){
    const [nextBtnStatus, setNextBtnStatus] = useState<boolean>(false);
    const [kitchenName, setKitchenName] = useState<string>("");

    const kitchenInputHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setKitchenName(e.target.value);
        console.log(kitchenName.length);
        
        if(!kitchenName || kitchenName.length < 2){
            setNextBtnStatus(false);
            return;
        }
        setNextBtnStatus(true);
    }

    const singupNextHandler = () =>{
        
        //회원가입 고고싱
    }
    return (
        <div className="container mx-auto">
            <div className="m-16 mt-100">
                <div className="my-40 grid">
                    <div className="my-20">
                        <p className="font-bold mb-6">나의 부엌 이름을 지어주세요!</p>
                        <CommonInputBox type="text" placeholder="나의 부엌 이름을 지어주세요!" name="" value={kitchenName} onChange={kitchenInputHandler} />
            
                    </div>
                </div>
                <div className="mt-60">
                    <SignUpButton onClick={singupNextHandler} text="회원가입 완료" status={nextBtnStatus}/>
                </div>
            </div>
        </div>
    )
}