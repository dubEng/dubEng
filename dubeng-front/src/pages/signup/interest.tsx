import {useState, useEffect, useCallback} from "react";
import { useRouter } from "next/navigation";
import TagButton from "@/components/atoms/TagButton";
import SignUpButton from "@/features/signup/atoms/SignUpButton";
import userGetInterestList from "@/apis/signup/queries/useGetInterestList";

interface interest{
    id : number;
    name : string;
}
export default function interestPage(){
    const route = useRouter();
    const {refetch, error} = userGetInterestList();
    const [interestList, setInterestList] = useState<interest[]>([])
    const [nextBtnStatus, setNextBtnStatus] = useState<boolean>(false);
    const [selectedTag, setSelectedTag] = useState<number[]>([]);    // 선택한 카테고리 태그
    useEffect(()=>{
        getInterestList();
    },[]);
    const getInterestList = useCallback(
        async () =>{
            const {data} = await refetch();
            setInterestList(data);
            console.log(data);
            
        },[]
    );
    // 태그 선택
    const handleClickTag = (id: number) => {
        console.log(selectedTag);
        if (selectedTag.includes(id)) {
            setSelectedTag(selectedTag.filter((tagId) => tagId !== id));
        } else {
            setSelectedTag([...selectedTag, id]);
        }
        // 태그 선택이 여러개가 되어야 함.
        if(selectedTag.length === 1){
            setNextBtnStatus(false);
            return;
        }
        setNextBtnStatus(true);
        
    };
    const singupNextHandler = () =>{
        // 저장
        console.log(selectedTag);

        route.push('/signup/kitchen');

    }
    return (
        <div className="container mx-auto">
            <div className="m-16 mt-100">
                <div className="my-40 grid">
                    <div className="my-20">
                        <p className="font-bold mb-6">나의 관심사</p>
                        <div>
                            {/* 관심사 목록 */}
                            {interestList?.map((inter, idx:number)=>(
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
                    <SignUpButton onClick={singupNextHandler} text="다음" status={nextBtnStatus}/>
                </div>
            </div>
        </div>
    )
}