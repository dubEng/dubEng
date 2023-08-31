import {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import TagButton from "@/components/atoms/TagButton";
import SignUpButton from "@/features/signup/atoms/SignUpButton";
import userGetInterestList from "@/apis/signup/queries/useGetInterestList";
import useSignupPost from "@/apis/signup/mutations/useSignupPost";

export interface Interest{
    id : number;
    name : string;
}

export interface SignupInfo{
    accessToken : string;
    nickname : string;
    categories : number[];
    introduce: string;
    gender : boolean;
    profileImgUrl: string;
}
export default function interestPage(){
    const route = useRouter();
    const mutation = useSignupPost();
    const {data} = userGetInterestList();
    const [nextBtnStatus, setNextBtnStatus] = useState<boolean>(false);
    const [selectedTag, setSelectedTag] = useState<number[]>([]);    // 선택한 카테고리 태그
    const { nickname, accessToken, introduce, gender, imageUrl } = useSelector((state: RootState) => state.signupInfo);
    
     useEffect(()=>{
        if(selectedTag.length < 1){
            setNextBtnStatus(false);
            return;
        }
        setNextBtnStatus(true);
        
    },[selectedTag]);

    // 태그 선택
    const handleClickTag = (id: number) => {
        if (selectedTag.includes(id)) {
            setSelectedTag(selectedTag.filter((tagId) => tagId !== id));
        } else {
            setSelectedTag([...selectedTag, id]);
        }
        
    };
    // 회원가입 과정
    const singupHandler = async () =>{
        const signupInfo:SignupInfo = {
            nickname : nickname,
            accessToken : accessToken,
            categories : selectedTag,
            introduce : introduce,
            gender : gender,
            profileImgUrl : imageUrl,
        }

        // POST 요청
        try{
            const result = await mutation.mutateAsync(signupInfo);
            if(result === 'success'){
                route.push('/login/success');
            }
            
        }catch(error){
            window.alert("회원가입 과정에서 오류가 발생했습니다.");
            route.push('/login');
        }
    }
    return (
        <div className="container mx-auto">
            <div className="m-16 mt-100">
                <div className="my-40 grid">
                    <div className="my-20">
                        <p className="font-bold mb-6">나의 관심사</p>
                        <p className="mb-6 text-xs text-dubgray">관심사를 기반으로 추천 영상을 제공해요!</p>
                        <div>
                            {/* 관심사 목록 */}
                            {data && data.map((inter, idx:number)=>(
                              <TagButton
                                onClick={() => handleClickTag(inter.id)}
                                id={inter.id}
                                key={idx}
                                name={inter.name}
                                isSelected={selectedTag.includes(inter.id) ? true : false}
                              />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-60">
                    <SignUpButton onClick={singupHandler} text="회원가입" status={nextBtnStatus}/>
                </div>
            </div>
        </div>
    )
}