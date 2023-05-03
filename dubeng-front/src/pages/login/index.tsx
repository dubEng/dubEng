import { useState, useEffect } from "react";
import Image from "next/image";
import DubLogoImage from "../../../public/images/logo/dubeng_logo.png";
import LoginBtnImage from "../../../public/images/login/kakao_login_medium_wide.png";
import Script from "next/script";

declare global {
  interface Window{
    Kakao:any;
  }
}

export default function LogInPage(){
  const loginHandler = () =>{
    const jsKey = "3b8aa9073d9bab90e4440dbad2ccffb2";
    if(!window.Kakao.isInitialized()){
      window.Kakao.init(jsKey);
      
      window.Kakao.Auth.authorize({
        redirectUri: 'http://localhost:9000/user/auth/kakao/callback'
      });
    }
  }

  return (
  <div className="container mx-auto">
    <Script src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js" defer></Script>
    <div>
      <Image className="mx-auto" src={DubLogoImage} alt="dubLogoImg"  width={120} height={60}></Image>
      <p className="text-dubgray text-xs text-center my-5">더빙으로 즐거움이 더블</p>
    </div>
    <div onClick={loginHandler}>
      <Image className="mx-auto" src={LoginBtnImage} alt="kakaoLoginBtn" width={350}></Image>
    </div>
  </div>
  );
}