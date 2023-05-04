import { ImCheckmark } from "react-icons/im";
import { ImCross } from "react-icons/im";
import {CheckMessageStatus} from "../../enum/statusType";

interface Iprops {
  status: string;
}

export default function CheckMessage({status} : Iprops) {

  if(status === CheckMessageStatus.ISVALID){
    return <p className="text-12 -mt-8 ml-8 text-[#0FA64B] h-16 leading-16"><ImCheckmark className="inline-block mr-6 mb-4" size={14} />사용 가능한 닉네임입니다</p>
  } else if (status === CheckMessageStatus.NICKNAME_DUPLICATION){
    return <p className="text-12 -mt-8 ml-8 text-dubcoral h-16 leading-16"><ImCross className="inline-block mr-6 mb-4" size={14} />이미 존재하는 닉네임입니다</p>
  } else if (status === CheckMessageStatus.NICKNAME_LIMIT_SIX){
    return <p className="text-12 -mt-8 ml-8 text-dubcoral h-16 leading-16"><ImCross className="inline-block mr-6 mb-4" size={14} />닉네임은 6자 이내여야 합니다</p>
  } else if (status === CheckMessageStatus.INTRODUCE_LIMIT_FIFTEEN){
    return <p className="text-12 -mt-8 ml-8 text-dubcoral h-16 leading-16"><ImCross className="inline-block mr-6 mb-4" size={14} />한 줄 소개는 15자 이내여야 합니다</p>
  } else if (status === CheckMessageStatus.INIT){
    return <p className="text-12 -mt-8 ml-8 text-dubcoral h-16 leading-16"></p>
  }
  
  return <></>;
}
