import Image from "next/image";
import DubLogoImage from "../../../public/images/login/LoginImage.svg";
import LoginBtnImage from "../../../public/images/login/KakaoLoginButton.svg";
import Script from "next/script";
import Link from "next/link";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function LogInPage() {
  const kakaoLoginHandler = () => {
    const jsKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(jsKey);

      window.Kakao.Auth.authorize({
        redirectUri: redirectUri,
      });
    }
  };
  const googleLoginHandler = () => {
    const leftPosition = window.screen.width / 2 - 300; // 새 창의 가로 위치
    const topPosition = window.screen.height / 2 - 400; // 새 창의 세로 위치
  
    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?`
    + `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`
    + `&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`
    + `&response_type=code`
    + `&access_type=offline`
    + `&scope=email profile`;

    window.open(googleUrl, '_parent', `width=600,height=800,left=${leftPosition},top=${topPosition}`);
  }
  return (
    <div className="container mx-auto h-screen">
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        defer
      ></Script>
      <div className="mt-180">
        <div className="mb-16">
          <Link href={"/"}>
            <Image
              className="mx-auto"
              src={DubLogoImage}
              alt="dubLogoImg"
              width={370}
              height={370}
            ></Image>
          </Link>
          {/* <p className="text-dubgray text-xs text-center my-5">더빙으로 즐거움이 더블</p> */}
        </div>
        <div className="flex flex-col justify-center">
          <button onClick={kakaoLoginHandler}>
            <Image
              className="mx-auto"
              src={LoginBtnImage}
              alt="kakaoLoginBtn"
              width={350}
            ></Image>
          </button>
          <p></p>
          <button onClick={googleLoginHandler}>
            <Image
              className="mx-auto"
              src={LoginBtnImage}
              alt="kakaoLoginBtn"
              width={350}
            ></Image>
          </button>
        </div>
      </div>
    </div>
  );
}
