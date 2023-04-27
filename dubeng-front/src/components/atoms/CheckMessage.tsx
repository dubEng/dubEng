import { ImCheckmark } from "react-icons/im";
import { ImCross } from "react-icons/im";
import {CheckMessageStatus} from "../../enum/statusType";

interface Iprops {
  status: string;
}

export default function CheckMessage({status} : Iprops) {

  if(status === CheckMessageStatus.ISVALID){
    return <p className="text-12 text-[#0FA64B] h-25 leading-25"><ImCheckmark className="inline-block mr-6 mb-4" size={20} />사용 가능한 닉네임입니다</p>
  } else if (status === CheckMessageStatus.NICKNAME_DUPLICATION){
    return <p className="text-12 text-dubcoral h-25 leading-25"><ImCross className="inline-block mr-6 mb-4" size={16} />이미 존재하는 닉네임입니다</p>
  } else if (status === CheckMessageStatus.NICKNAME_LIMIT_SIX){
    return <p className="text-12 text-dubcoral h-25 leading-25"><ImCross className="inline-block mr-6 mb-4" size={16} />닉네임은 6자 이내여야 합니다</p>
  } else if (status === CheckMessageStatus.INTRODUCE_LIMIT_FIFTEEN){
    return <p className="text-12 text-dubcoral h-25 leading-25"><ImCross className="inline-block mr-6 mb-4" size={16} />한 줄 소개는 15자 이내여야 합니다</p>
  }
  
  return <></>;
}
