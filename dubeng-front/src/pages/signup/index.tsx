import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";
import LoginImage from "../../../public/images/login/noone.png";
import { saveSignupInfo } from "../../stores/user/signupSlice";
import CommonInputBox from "@/components/atoms/CommonInputBox";
import { CheckMessageStatus } from "@/enum/statusType";
import CheckMessage from "@/components/atoms/CheckMessage";
import { MdChangeCircle } from "react-icons/md";
import SignUpButton from "@/features/signup/atoms/SignUpButton";
import userGetNicknameCheck from "@/apis/signup/queries/useGetNicknameCheck";

import cookie from 'react-cookies';

export default function SignUpPage(){
  const [nickname, setNickname] = useState<string>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [nextBtnStatus, setNextBtnStatus] = useState<boolean>(false);
  const [checknicknameMsg, setchecknicknameMsg] = useState<CheckMessageStatus>(CheckMessageStatus.INIT);
  const [checkintroduceMsg, setcheckintroduceMsg] = useState<CheckMessageStatus>(CheckMessageStatus.INIT);
  
  const [profileImage, setProfileImage] = useState<string | null>(null); // 기본 이미지
  const {refetch, error} = userGetNicknameCheck(nickname);

  const nicknameLimitSize = 6;
  const introduceLimitSize = 15;

  const route = useRouter();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    // null 처리 해야함
    setProfileImage(cookie.load("imageUrl"));

  },[]);

  const nicknameChange = async (e : React.ChangeEvent<HTMLInputElement>) =>{
    const nickname = e.target.value;
    setNickname(nickname);

    //유효성 체크
    if(!nickname || nickname.length > nicknameLimitSize || nickname.length <= 1){
      setchecknicknameMsg(CheckMessageStatus.NICKNAME_LIMIT_SIX);
      setNextBtnStatus(false);
      return;
    }
    setchecknicknameMsg(CheckMessageStatus.ISVALID);
    
    //back과 통신
    await refetch();
    
    if(error){
      // 닉네임 중복
      setchecknicknameMsg(CheckMessageStatus.NICKNAME_DUPLICATION);
      setNextBtnStatus(false);
    }
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

    setNextBtnStatus(true);
  }
  const singupNextHandler = () =>{
    // 리덕스 저장
    // dispatch해줄 것
    const signuoInfoToSubmit = { accessToken: cookie.load("accessToken"),
        imageUrl : profileImage,
        nickname : nickname,
        introduce : introduce
    };
    dispatch(saveSignupInfo(signuoInfoToSubmit))

    route.push('/signup/interest');
  }
  return (
    <div className="container mx-auto">
      <div className="m-16 mt-100">
        <div className="my-40 grid">
          <div className="mx-auto relative">
            {profileImage && <Image className="rounded-full" src={profileImage} alt="dubLogoImg" width={140} height={140}></Image>}
            <button className="absolute right-12 bottom-4 z-2 rounded-full bg-white"><MdChangeCircle size={30}/></button>
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