import {useState} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoginImage from "../../../public/images/login/noone.png";

import CommonInputBox from "@/components/atoms/CommonInputBox";
import { CheckMessageStatus } from "@/enum/statusType";
import CheckMessage from "@/components/atoms/CheckMessage";
import { MdChangeCircle } from "react-icons/md";
import SignUpButton from "@/features/signup/atoms/SignUpButton";

export default function SignUpPage(){
  const [nickname, setNickname] = useState<string>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [nextBtnStatus, setNextBtnStatus] = useState<boolean>(false);
  const [checknicknameMsg, setchecknicknameMsg] = useState<CheckMessageStatus>(CheckMessageStatus.INIT);
  const [checkintroduceMsg, setcheckintroduceMsg] = useState<CheckMessageStatus>(CheckMessageStatus.INIT);
  const nicknameLimitSize = 6;
  const introduceLimitSize = 15;

  const route = useRouter();
  const nicknameChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const nickname = e.target.value;
    setNickname(nickname);

    //유효성 체크
    if(!nickname || nickname.length > nicknameLimitSize  || nickname.length <= 1){
      setchecknicknameMsg(CheckMessageStatus.NICKNAME_LIMIT_SIX);
      setNextBtnStatus(false);
      return;
    }
    setchecknicknameMsg(CheckMessageStatus.ISVALID);
    //back과 통신

  }
  const introduceChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    setIntroduce(e.target.value);
    
    //유효성 체크
    if(!introduce || introduce.length > introduceLimitSize || introduce.length <= 1){
      setcheckintroduceMsg(CheckMessageStatus.INTRODUCE_LIMIT_FIFTEEN);
      setNextBtnStatus(false);
      return;
    }
    setcheckintroduceMsg(CheckMessageStatus.INIT);
    //back과 통신

    setNextBtnStatus(true);
  }
  const singupNextHandler = () =>{
    route.push('/signup/interest');
  }
  return (
    <div className="container mx-auto">
      <div className="m-16 mt-100">
        <div className="my-40 grid">
          <div className="mx-auto relative">
            <Image className="rounded-full" src={LoginImage} alt="dubLogoImg" width={140}></Image>
            <button className="absolute right-14 bottom-14 z-2 rounded-full bg-white"><MdChangeCircle size={30}/></button>
          </div>

          
        </div>
        <div>
          {/* 닉네임 입력 */}
          <div className="my-20">
            <p className="font-bold mb-6">닉네임</p>
            <CommonInputBox type="text" placeholder="닉네임을 입력하세요." name="" value={nickname} onChange={nicknameChange} />
            <p className="text-right text-xs text-dubgray">{nickname.length}/{nicknameLimitSize}</p>
            <CheckMessage status={checknicknameMsg}/>
          </div>
          <div className="my-20">
            <p className="font-bold mb-6">한 줄 소개</p>
            <CommonInputBox type="text" placeholder="나를 표현하는 한 줄을 적어주세요." name="" value={introduce} onChange={introduceChange} />
            <p className="text-right text-xs text-dubgray">{introduce.length}/{introduceLimitSize}</p>
            <CheckMessage status={checkintroduceMsg}/>
          </div>
        </div>
        <div className="mt-60">
            <SignUpButton onClick={singupNextHandler} text="다음" status={nextBtnStatus}/>
        </div>
      </div>
    </div>
  );
}