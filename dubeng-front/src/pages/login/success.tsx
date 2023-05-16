import { useRouter } from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { saveAccessToken } from "@/stores/user/userSlice";
import cookie from 'react-cookies';
import useUserInfoPost from "@/apis/login/mutations/useUserInfoPost";

export interface Token{
    accessToken : string;
    refreshToken : string;
}

export default function loginSuccess(){
    const [accessToken, setAccessToken] = useState<string>('');
    const mutation = useUserInfoPost(cookie.load("accessToken"));
    const dispatch = useDispatch();
    const route = useRouter();

    useEffect(()=>{
        setAccessToken(cookie.load("accessToken"));
        dispatch(saveAccessToken(cookie.load("accessToken")));
        getUserInfo();
        
      },[accessToken]);
      const getUserInfo = useCallback(async()=>{  
        try{
            const result = await mutation.mutateAsync(cookie.load("accessToken"));            
            route.push('/');
        }catch(error){
            route.push('/login');
        }
      },[])
    

    return (
        <></>
    )
}