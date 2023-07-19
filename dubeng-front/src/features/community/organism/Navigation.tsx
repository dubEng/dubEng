import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import PageButton from "@/components/atoms/PageButton";
interface Iprops {
  page: number;
  totalPages: number;
  setPage: Function;
}

export default function Navigation({ page, totalPages, setPage }: Iprops) {
  const page_list = Array.from({ length: totalPages }, (v, i) => i + 1);

  const handleClickPage = (page_num: number) => {
    console.log(page_num);
    setPage(page_num - 1);
  };

  const handleClickPageFront = () => {
    console.log("페이지 앞 버튼 클릭");
    if (page - 1 >= 0) {
      setPage(page - 1);
    }
  };

  const handleClickPageBack = () => {
    console.log("페이지 뒤 버튼 클릭");
    if (page + 1 <= totalPages - 1) {
      setPage(page + 1);
    }
  };
  return (
    <div className="flex justify-center items-center space-x-20">
      {/* <p>{page}</p>
      <p>{totalPages}</p> */}
      <MdArrowBackIosNew
        onClick={() => handleClickPageFront()}
        className="cursor-pointer"
      />
      <div className="flex items-center justify-center space-x-4">
        {page_list.map((item, index) => {
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
        })}
      </div>
      <MdArrowForwardIos
        onClick={() => handleClickPageBack()}
        className="cursor-pointer"
      />

      {/* {data &&
                data[0].map((category: { id: any; name: string }) => {
                  return (
                    <CategoryButton
                      key={category.id}
                      id={category.id}
                      name={category.name}
                      isSelected={
                        selectedCategory.includes(category.id) ? true : false
                      }
                      onClick={() => handleClickCategory(category.id)}
                    />
                  );
                })} */}
    </div>
  );
}
