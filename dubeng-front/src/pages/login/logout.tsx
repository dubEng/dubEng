import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import useLogoutPost from "@/apis/login/mutations/useLogoutPost";
import { useEffect } from "react";

export default function Logout(){
    const {accessToken} = useSelector((state: RootState) => state.user);
    const { mutate } = useLogoutPost(accessToken);

    useEffect(()=>{
        mutate();
    },[]);
    return (<></>)
}