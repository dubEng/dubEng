import {useState, useEffect} from "react";
import SignUpButton from "@/features/signup/atoms/SignUpButton";

export default function kitchen(){
    const [nextBtnStatus, setNextBtnStatus] = useState<boolean>(true);
    const singupNextHandler = () =>{

    }
    return (
        <div className="container mx-auto">
            <div className="m-16 mt-100">
                <div className="my-40 grid">
                    <div className="my-20">
                        <p className="font-bold mb-6">나의 부엌 이름을 지어주세요!</p>

                    </div>
                </div>
                <div className="mt-60">
                    <SignUpButton onClick={singupNextHandler} text="회원가입 완료" status={nextBtnStatus}/>
                </div>
            </div>
        </div>
    )
}