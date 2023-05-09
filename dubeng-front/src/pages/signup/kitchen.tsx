import {useState} from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

import SignUpButton from "@/features/signup/atoms/SignUpButton";
import CommonInputBox from "@/components/atoms/CommonInputBox";
import useSignupPost from "@/apis/signup/mutations/useSignupPost";
export interface SignupInfo{
    accessToken : string;
    nickname : string;
    categories : number[];
    introduce: string;
    kitchenName : string;
    gender : boolean;
}
export default function kitchen(){
    const [nextBtnStatus, setNextBtnStatus] = useState<boolean>(false);
    const [kitchenName, setKitchenName] = useState<string>("");

    const mutation = useSignupPost();
    const route = useRouter();
    //Redux
    const { nickname, accessToken, interest, introduce } = useSelector((state: RootState) => state.signupInfo);

    const kitchenInputHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setKitchenName(e.target.value);
        console.log(kitchenName.length);
        
        if(!kitchenName || kitchenName.length < 2){
            setNextBtnStatus(false);
            return;
        }
        setNextBtnStatus(true);
    }

    const singupNextHandler = async () =>{
        
        //회원가입 고고싱
        console.log(`nickname : ${nickname}`);
        console.log(`accessToken : ${accessToken}`);
        console.log(`interest : ${interest}`);
        console.log(`introduce : ${introduce}`);
        
        const signupInfo:SignupInfo = {
            nickname : nickname,
            accessToken : accessToken,
            categories : interest,
            introduce : introduce,
            kitchenName : kitchenName,
            gender : true
        }
        // POST 요청
        try{
            const result = await mutation.mutateAsync(signupInfo);
            console.log(result);
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