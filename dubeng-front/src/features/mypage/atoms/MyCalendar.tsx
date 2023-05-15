import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import Calendar from 'react-calendar';
import Moment from 'moment';
import "moment/locale/ko"; // Locale Setting

import useCalenderQuery from '@/apis/mypage/queries/useCalenderQuery';

export interface Attendance {
  year : number;
  month : number;
}
export default function MyCalendar(){
  const [value, setValue] = useState(new Date());
  const [mark, setMark] = useState<Array<string>>([]);

  //현재 날짜
  const month : number = parseInt(Moment(new Date()).format("MM"));
  const year : number = parseInt(Moment(new Date()).format("YYYY"));
  const [attendance, setAttendance] = useState<Attendance>({month:month, year:year});

  const {data} = useCalenderQuery(attendance);
  useEffect(()=>{
    setMark(data);
  },[data]);

  const datePickHandler = (value: any, event: React.MouseEvent<HTMLButtonElement>)=>{
    setValue(value);
  }
  // 캘린더 년,월 선택 이벤트
  const navClickHandler = (date : any) => {
    const month = parseInt(Moment(date).format("MM"));
    const year = parseInt(Moment(date).format("YYYY"));
    setAttendance({month:month, year:year});
  }
  return (
    <Calendar
     onActiveStartDateChange={({activeStartDate}) => navClickHandler(activeStartDate)}
     onChange={datePickHandler} 
     formatDay={(locale, date) => Moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
     value={value}
     minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
     maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
     showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
     className="mx-auto w-full text-sm rounded-5 border-none"
     tileContent={({date})=>{
        // 추가할 html 태그를 변수 초기화
        let html = [];
        // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
        if (mark?.find((x) => x === Moment(date).format("YYYY-MM-DD"))) {
          html.push(<div className="dot"></div>);
        }else{
          html.push(<div className="none"></div>);
        }
      return (
        <>
        <div className="flex justify-center items-center absolute">
          {html}
        </div>
        </>
      );
     }}
    />
  );
}