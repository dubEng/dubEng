import {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import TagButton from "@/components/atoms/TagButton";
import SignUpButton from "@/features/signup/atoms/SignUpButton";

interface interest{
    id : number;
    name : string;
}
export default function interestPage(){
    const route = useRouter();

    const [interestList, setInterestList] = useState<interest[]>([{id:1, name : '판타지1'},{id:2, name : '판타지2'},{id:3, name : '판타지3'},])
    const [nextBtnStatus, setNextBtnStatus] = useState<boolean>(true);
    useEffect(()=>{
        // const list = {'tagName' : '판타지4'};
        // setInterestList([...interestList, list]);
    });
    // 선택한 카테고리 태그
    const [selectedTag, setSelectedTag] = useState<number[]>([]);

    // 태그 선택
    const handleClickTag = (id: number) => {
        console.log("클릭햇슈");
        
        console.log(selectedTag);
        if (selectedTag.includes(id)) {
            setSelectedTag(selectedTag.filter((tagId) => tagId !== id));
        } else {
            setSelectedTag([...selectedTag, id]);
        }
        
    };
    const singupNextHandler = () =>{
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