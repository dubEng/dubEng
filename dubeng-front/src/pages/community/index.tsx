import CommentListItem from "@/features/community/molecules/CommentListItem";
import ProfileOne from "@/public/images/dump/profile_01.svg";
import Dummy from "../../../public/images/dump/webarebears_image.png";
import Header from "@/components/atoms/Header";
import DubTypeTap from "@/features/community/atoms/DubTypeTap";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { DubType } from "@/enum/statusType";
import DubSituation from "@/features/community/molecules/DubSituation";
import SearchInputBox from "@/features/community/atoms/SearchInputBox";
import { useState } from "react";
import useRecommendDubVideoQuery from "@/apis/community/queries/useRecommendDubVideoQuery";
import CategoryList from "@/features/community/organism/CategoryList";
import DubVideoListItem from "@/components/molecules/DubVideoListItem";
import useCategoryQuery from "@/apis/manager/queries/useCategoryQuery";
import DubProductList from "@/features/home/organism/DubProductList";
import LanguageSelectTap from "@/features/community/atoms/LanguageSelectTap";
import CategoryButton from "@/features/community/atoms/CategoryButton";

export default function CommunityPage() {
  // 전역에서 들고오는 state
  const tabIndex = useSelector((state: RootState) => {
    return state.communityTab.dubType;
  });
  const languageIndex = useSelector((state: RootState) => {
    return state.languageTab.langType;
  });

  // 현재 페이지에서 관리하는 state
  const [searchValue, setSearchValue] = useState("");
  const [keyword, setKeyword] = useState("");

  // API 호출 response로 들어오는 state
  const { data } = useRecommendDubVideoQuery("english");
  console.log("recommendDubVideoList", data?.data.ContentsRecommendList);

  const recommendDubVideoList = {
    hasNextPage: true,
    ContentsRecommendList: [
      {
        id: 8,
        title: "영상제목",
        thumbnail: "썸네일링크",
      },
      {
        id: 31,
        title: "The “I Hate Rachel” Club (Clip) | Friends | TBS",
        thumbnail: "https://i.ytimg.com/vi/YXOUOOtfTBs/maxresdefault.jpg",
      },
      {
        id: 37,
        title: "The “I Hate Rachel” Club (Clip) | Friends | TBS",
        thumbnail: "https://i.ytimg.com/vi/YXOUOOtfTBs/maxresdefault.jpg",
      },
      {
        id: 38,
        title: "The “I Hate Rachel” Club (Clip) | Friends | TBS",
        thumbnail: "https://i.ytimg.com/vi/YXOUOOtfTBs/maxresdefault.jpg",
      },
      {
        id: 40,
        title: "The “I Hate Rachel” Club (Clip) | Friends | TBS",
        thumbnail: "https://i.ytimg.com/vi/YXOUOOtfTBs/maxresdefault.jpg",
      },
    ],
  };

  // const categoryList = useCategoryQuery();
  // console.log("categoryList", categoryList);
  const categoryList = {
    data: [
      {
        id: 1,
        name: "판타지",
      },
      {
        id: 2,
        name: "로맨스",
      },
      {
        id: 3,
        name: "드라마",
      },
      {
        id: 4,
        name: "애니메이션",
      },
      {
        id: 5,
        name: "SF",
      },
      {
        id: 6,
        name: "기쁨",
      },
      {
        id: 7,
        name: "식당에서",
      },
      {
        id: 8,
        name: "멜로",
      },
      {
        id: 9,
        name: "가족영화",
      },
      {
        id: 10,
        name: "스릴러",
      },
      {
        id: 11,
        name: "미스테리",
      },
      {
        id: 12,
        name: "공포",
      },
    ],
  };

  // 함수
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handleSearchInputKeyDown = (
    event: React.KeyboardEvent<HTMLElement>
  ) => {
    if (event.code === "Enter") {
      setKeyword(searchValue);
    }
  };

  // 선택한 카테고리 태그
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);

  // 태그 선택
  const handleClickCategory = (id: number) => {
    if (selectedCategory.includes(id)) {
      setSelectedCategory(selectedCategory.filter((tagId) => tagId !== id));
    } else {
      setSelectedCategory([...selectedCategory, id]);
    }
  };

  return (
    <div className="static mx-16">
      <Header />
      <div className="flex sticky top-0">
        <DubTypeTap dubType={tabIndex} langType={languageIndex} />
      </div>
      <p className="flex justify-start text-19 font-bold mt-24 mb-16">
        김언도님이 좋아하실 영상
      </p>
      <DubProductList />
      <p className="flex justify-start text-19 font-bold mt-24 mb-16">
        상황별로 더빙해봐요
      </p>
      <DubSituation />
      <div className="mt-24"></div>
      <SearchInputBox
        type="text"
        name="searchInputBox"
        value={searchValue}
        placeholder="더빙할 콘텐츠를 검색해보세요."
        onChange={handleSearchInputChange}
        onKeyDown={handleSearchInputKeyDown}
      />
      <CategoryList></CategoryList>
      {categoryList.data?.map((category: { id: any; name: string }) => {
        return (
          <CategoryButton
            key={category.id}
            id={category.id}
            name={category.name}
            isSelected={selectedCategory.includes(category.id) ? true : false}
            onClick={() => handleClickCategory(category.id)}
          />
        );
      })}
      <div className="space-y-16 mt-24">
        {data?.data.ContentsRecommendList.map(
          (dubVideo: { id: number; title: string; thumbnail: string }) => (
            <DubVideoListItem
              key={dubVideo.id}
              id={dubVideo.id}
              title={dubVideo.title}
              thumbnail={"https://i.ytimg.com/vi/YXOUOOtfTBs/maxresdefault.jpg"}
              runtime={"2분 10초"}
            />
          )
        )}
      </div>
    </div>
  );
}
