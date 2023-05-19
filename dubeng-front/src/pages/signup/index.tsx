<<<<<<< HEAD
export default function SignUpPage(){
  return (<>회원가입 페이지</>);
}
=======
import {useEffect,useRef, useState} from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { saveSignupInfo } from "../../stores/user/signupSlice";
import CommonInputBox from "@/components/atoms/CommonInputBox";
import { CheckMessageStatus } from "@/enum/statusType";
import CheckMessage from "@/components/atoms/CheckMessage";
import { MdChangeCircle } from "react-icons/md";
import SignUpButton from "@/features/signup/atoms/SignUpButton";
import userGetNicknameCheck from "@/apis/signup/queries/useGetNicknameCheck";

import cookie from 'react-cookies';

export default function SignUpPage(){
  const nicknameMounted = useRef(false);
  const introdeuceMounted = useRef(false);
  const [nickname, setNickname] = useState<string>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [gender, setGender] = useState<any>(undefined);
  const [nextBtnStatus, setNextBtnStatus] = useState<boolean>(false);
  const [checknicknameMsg, setchecknicknameMsg] = useState<CheckMessageStatus>(CheckMessageStatus.INIT);
  const [checkintroduceMsg, setcheckintroduceMsg] = useState<CheckMessageStatus>(CheckMessageStatus.INIT);
  const [isKakaoUrl, setIsKakaoUrl] = useState<boolean>(false); // 카카오 이미지를 사용하는지?
  const [kakaoUrl, setKakaoUrl] = useState<string | null>(null); //카카오 이미지 Url
  const [profileImage, setProfileImage] = useState<string>('/images/login/default_profile.png'); // 기본 이미지
  const { refetch } = userGetNicknameCheck(nickname);
  
  const nicknameLimitSize = 6;
  const introduceLimitSize = 15;

  const route = useRouter();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    // null 처리 해야함
    const kakaoImageUrl = cookie.load("imageUrl");
    if(kakaoImageUrl){
      setKakaoUrl(kakaoImageUrl);
    }
    
  },[]);

  const check_kor = /^[가-힣]+$/;  // 한글 체크
  useEffect(()=>{
    checkNickname(nickname);
  },[nickname])

  const checkNickname = async (nickname:string) =>{
    // 첫 렌더링시 호출 막기
    if(!nicknameMounted.current){
      nicknameMounted.current = true;
      return;
    }
    //닉네임 유효성 체크
    if(!nickname || nickname.length > nicknameLimitSize || nickname.length <= 1){
      setchecknicknameMsg(CheckMessageStatus.NICKNAME_LIMIT_SIX);
      setNextBtnStatus(false);
      return;
    }
    // 문법 체크
    if(!check_kor.test(nickname)){
      setchecknicknameMsg(CheckMessageStatus.NICKNAME_INVALID_SYNTAX);
      setNextBtnStatus(false);
      return;
    }
    const {data} = await refetch();
    if(data){
      // 닉네임 중복체크
      setchecknicknameMsg(CheckMessageStatus.NICKNAME_DUPLICATION);
      setNextBtnStatus(false);
      return;
    }
    setchecknicknameMsg(CheckMessageStatus.NICKNAME_ISVALID);
  }
  useEffect(()=>{
    // 첫 렌더링시 호출 막기
    checkIntroduce(introduce);

  },[introduce]);
  const checkIntroduce = async (introduce: string) =>{
    if(!introdeuceMounted.current){
      introdeuceMounted.current = true;
      return;
    }
    
    // 한줄 소개 유효성 체크
    if(!introduce || introduce.length > introduceLimitSize || introduce.length <= 1){
      setcheckintroduceMsg(CheckMessageStatus.INTRODUCE_LIMIT_FIFTEEN);
      setNextBtnStatus(false);
      return;
    }
    setcheckintroduceMsg(CheckMessageStatus.INTRODUCE_ISVALID);
  }
  
  //nextBtn
  useEffect(()=>{
    if(checknicknameMsg === CheckMessageStatus.NICKNAME_ISVALID && checkintroduceMsg === CheckMessageStatus.INTRODUCE_ISVALID && gender != undefined){
      setNextBtnStatus(true);
    }
  },[checknicknameMsg, checkintroduceMsg, gender])

  const nicknameChange = async (e : React.ChangeEvent<HTMLInputElement>) =>{
    const nickname = e.target.value;
    setNickname(nickname);
  }
  const introduceChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const introduce = e.target.value;
    setIntroduce(introduce);
  }
  const genderChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const gender = parseInt(e.target.value);
    
    if(gender == 1){
      setGender(true);
    }else{
      setGender(false);
    }

    
  }
  const imageChangeHandler = () =>{
    setIsKakaoUrl(!isKakaoUrl);
    // 이미지 change 이벤트
    if(isKakaoUrl && kakaoUrl){
      //카카오 이미지를 사용하고 카카오 이미지가 있다면
      // setProfileImage(kakaoUrl);
      setProfileImage(kakaoUrl);
    }else{
      setProfileImage('/images/login/default_profile.png');
    }
  }
  const singupNextHandler = () =>{
    // 리덕스 저장
    // dispatch해줄 것
    const signuoInfoToSubmit = { accessToken: cookie.load("accessToken"),
        imageUrl : profileImage,
        nickname : nickname,
        introduce : introduce,
        gender : gender,
    };
    dispatch(saveSignupInfo(signuoInfoToSubmit))

    route.push('/signup/interest');
  }
  return (
    <div className="container mx-auto">
      <div className="m-16 mt-100">
        <div className="my-40 grid">
          <p className="font-bold mb-6">프로필 이미지 선택</p>
          <div className="mt-20 mx-auto flex" >
            { !isKakaoUrl && <Image className="rounded-full bg-none" src={"/images/login/default_profile.png"} alt="defaultImg" width={120} height={120}></Image>}
            { isKakaoUrl && kakaoUrl && <Image className="rounded-full mb-10" src={kakaoUrl} alt="dubLogoImg" width={90} height={90}></Image>}
          </div>
          <div className="flex mx-auto" onClick={imageChangeHandler}>  
            { !isKakaoUrl && <span className="flex font-bold text-dubgray text-center items-center">카카오 이미지 사용하기</span>}
            { isKakaoUrl && <span className="flex font-bold text-dubgray text-center items-center">기본 이미지 사용하기</span>}
            <button className="rounded-full bg-white text-dubgray"><MdChangeCircle size={25}/></button>
          </div>

          
        </div>
        <div>
          {/* 닉네임 입력 */}
          <div className="my-20">
            <p className="font-bold mb-6">닉네임</p>
            <CommonInputBox type="text" placeholder="한글 닉네임을 입력하세요." name="" value={nickname} onChange={nicknameChange} />
            <p className="text-right text-xs text-dubgray">{nickname.length}/{nicknameLimitSize}</p>
            <CheckMessage status={checknicknameMsg}/>
          </div>
          <div className="my-20">
            <p className="font-bold mb-6">한 줄 소개</p>
            <CommonInputBox type="text" placeholder="나를 표현하는 한 줄을 적어주세요." name="" value={introduce} onChange={introduceChange} />
            <p className="text-right text-xs text-dubgray">{introduce.length}/{introduceLimitSize}</p>
            <CheckMessage status={checkintroduceMsg}/>
          </div>
          <div className="my-20">
            <p className="font-bold mb-6">성별</p>
            <div className="flex flex-row">
              <div className="items-center text-center">
                <span className="mr-5">남자</span>
                <input type="radio" name="gender" value="1" onChange={genderChange}/>
              </div>
              <div className="items-center text-center">
                <span className="ml-10 mr-5">여자</span>
                <input type="radio" name="gender" value="0" onChange={genderChange}/>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-60">
            <SignUpButton onClick={singupNextHandler} text="다음" status={nextBtnStatus}/>
        </div>
      </div>
    </div>
  );
}

>>>>>>> develop-front
