import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import PageButton from "@/components/atoms/PageButton";
import { useEffect, useState } from "react";

interface Iprops {
  page: number;
  totalPages: number;
  currentPageArray: number[];
  setPage: Function;
  inputRef: any;
}

export default function Pagination({
  page,
  totalPages,
  currentPageArray,
  setPage,
  inputRef,
}: Iprops) {
  const handleClickPage = (page_num: number) => {
    console.log(page_num);
    setPage(page_num - 1);
    console.log("확인", inputRef);
    inputRef.current.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
    window.scrollBy({
      top: -57,
    });
  };

  const handleClickPageFront = () => {
    console.log("페이지 앞 버튼 클릭");
    if (page - 1 >= 0) {
      setPage(page - 1);
      inputRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
      window.scrollBy({
        top: -57,
      });
    }
  };

  const handleClickPageBack = () => {
    console.log("페이지 뒤 버튼 클릭");
    if (page + 1 <= totalPages - 1) {
      setPage(page + 1);
      inputRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
      window.scrollBy({
        top: -57,
      });
    }
  };

  // // 페이지 자르는 함수
  // const sliceArrayByLimit = (totalPage: number, limit: number) => {
  //   const totalPageArray = Array.from({ length: totalPage }, (v, i) => i + 1);
  //   let result: number | any | never[] = [];

  //   while (totalPageArray.length > 0) {
  //     let tempArray;
  //     tempArray = totalPageArray.splice(0, limit);
  //     result = [...result, tempArray];
  //   }

  //   return result;
  // };

  // 페이지네이션 Array 넘어가게 해주는 로직
  // useEffect(() => {
  //   console.log("page", page);
  //   console.log("Math.floor(page / 5)", Math.floor(page / 5));
  //   setCurrentPageArray(totalPageArray[Math.floor(page / 5)]);
  // }, [page]);

  // 처음 페이지 렌더링될 때 or 토탈 페이지 개수 바뀔 때 페이지네이션 처리
  // useEffect(() => {
  //   const slicedPageArray = sliceArrayByLimit(totalPages, 5);
  //   console.log("totalPages 바뀔 때마다 useEffect", slicedPageArray);
  //   setTotalPageArray(slicedPageArray);
  //   setCurrentPageArray(slicedPageArray[0]);
  // }, [totalPages]);

  console.log("Pagiantion 안", currentPageArray);
  return (
    <div className="flex justify-center items-center space-x-20">
      <MdArrowBackIosNew
        onClick={() => handleClickPageFront()}
        className="cursor-pointer"
      />
      <div className="flex items-center justify-center space-x-4">
        {currentPageArray && currentPageArray.length > 0 ? (
          currentPageArray.map((item, index) => {
            return (
              <PageButton
                pageNumber={item}
                key={index}
                onClick={() => handleClickPage(item)}
                isSelected={page + 1 === item ? true : false}
              >
                {item}
              </PageButton>
            );
          })
        ) : (
          <>로딩 중....</>
        )}
      </div>
      <MdArrowForwardIos
        onClick={() => handleClickPageBack()}
        className="cursor-pointer"
      />
    </div>
  );
}
