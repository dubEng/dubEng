import { ImCheckmark } from "react-icons/im";
import { ImCross } from "react-icons/im";
import {CheckMessageStatus} from "../../enum/statusType";

interface Iprops {
  status: string;
}

export default function CheckMessage({status} : Iprops) {

<<<<<<< HEAD
  if(status === CheckMessageStatus.ISVALID){
    return <p className="text-12 text-[#0FA64B] h-16 leading-16"><ImCheckmark className="inline-block mr-6 mb-4" size={16} />사용 가능한 닉네임입니다</p>
  } else if (status === CheckMessageStatus.NICKNAME_DUPLICATION){
    return <p className="text-12 text-dubcoral h-16 leading-16"><ImCross className="inline-block mr-6 mb-4" size={16} />이미 존재하는 닉네임입니다</p>
  } else if (status === CheckMessageStatus.NICKNAME_LIMIT_SIX){
    return <p className="text-12 text-dubcoral h-16 leading-16"><ImCross className="inline-block mr-6 mb-4" size={16} />닉네임은 6자 이내여야 합니다</p>
  } else if (status === CheckMessageStatus.INTRODUCE_LIMIT_FIFTEEN){
    return <p className="text-12 text-dubcoral h-16 leading-16"><ImCross className="inline-block mr-6 mb-4" size={16} />한 줄 소개는 15자 이내여야 합니다</p>
=======
  if(status === CheckMessageStatus.NICKNAME_ISVALID){
    return <p className="text-12 -mt-8 ml-8 text-[#0FA64B] h-16 leading-16"><ImCheckmark className="inline-block mr-6 mb-4" size={14} />사용 가능한 닉네임입니다</p>
  } else if (status === CheckMessageStatus.NICKNAME_DUPLICATION){
    return <p className="text-12 -mt-8 ml-8 text-dubcoral h-16 leading-16"><ImCross className="inline-block mr-6 mb-4" size={14} />이미 존재하는 닉네임입니다.</p>
  } else if (status === CheckMessageStatus.NICKNAME_LIMIT_SIX){
    return <p className="text-12 -mt-8 ml-8 text-dubcoral h-16 leading-16"><ImCross className="inline-block mr-6 mb-4" size={14} />닉네임은 6자 이내여야 합니다.</p>
  } else if (status === CheckMessageStatus.INTRODUCE_LIMIT_FIFTEEN){
    return <p className="text-12 -mt-8 ml-8 text-dubcoral h-16 leading-16"><ImCross className="inline-block mr-6 mb-4" size={14} />한 줄 소개는 15자 이내여야 합니다.</p>
  } else if (status === CheckMessageStatus.INIT){
    return <p className="text-12 -mt-8 ml-8 text-dubcoral h-16 leading-16"></p>
  } else if (status === CheckMessageStatus.INTRODUCE_ISVALID){
    return <p className="text-12 -mt-8 ml-8 text-dubcoral h-16 leading-16"></p>
  } else if (status === CheckMessageStatus.NICKNAME_INVALID_SYNTAX){
    return <p className="text-12 -mt-8 ml-8 text-dubcoral h-16 leading-16"><ImCross className="inline-block mr-6 mb-4" size={14} />닉네임 형식이 올바르지 않습니다.</p>
  } else if (status === CheckMessageStatus.KITCHENNAME_LIMIT_FIFTEEN){
    return <p className="text-12 -mt-8 ml-8 text-dubcoral h-16 leading-16"><ImCross className="inline-block mr-6 mb-4" size={14} />큐티 뽀짝하게 15자 이내로 작성해주세요</p>
>>>>>>> develop-front
  }
  
  return <></>;
}
