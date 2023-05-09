import { useRouter } from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import cookie from 'react-cookies';
import useUserInfoPost from "@/apis/login/mutations/useUserInfoPost";

export interface Token{
    accessToken : string;
    refreshToken : string;
}

export default function loginSuccess(){
    const [accessToken, setAccessToken] = useState<string>('');
    const mutation = useUserInfoPost();
    const route = useRouter();

    useEffect(()=>{  
        setAccessToken(cookie.load("accessToken"));

        getUserInfo();
        
      },[]);
      const getUserInfo = useCallback(async()=>{  
        try{
            const result = await mutation.mutateAsync(cookie.load("accessToken"));
            console.log(result);
            
            
            route.push('/');
        }catch(error){
            route.push('/login');
        }
      },[])
    

    return (
        <></>
    )
}