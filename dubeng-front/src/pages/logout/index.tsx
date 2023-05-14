import { useEffect,useCallback } from "react"
import { useRouter } from "next/navigation";
import useLogoutQuery from "@/apis/login/queries/useLogoutQuery"

export default function logout(){
    const route = useRouter();
    useEffect(()=>{
        useLogoutQuery();
        console.log("로그아웃 했슈");
        
        route.push("/");
    },[])

    return (
        <></>
    )
}