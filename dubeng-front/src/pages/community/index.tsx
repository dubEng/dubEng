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
import { useEffect, useState } from "react";
import useRecommendDubVideoListQuery from "@/apis/community/queries/useRecommendDubVideoListQuery";
import DubVideoListItem from "@/components/molecules/DubVideoListItem";
import useCategoryListQuery from "@/apis/community/queries/useCategoryListQuery";
import DubProductList from "@/features/home/organism/DubProductList";
import LanguageSelectTap from "@/features/community/atoms/LanguageSelectTap";
import CategoryButton from "@/features/community/atoms/CategoryButton";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/free-mode"
// import { FreeMode } from "swiper";

import Vote from "@/features/community/organism/Vote";
import useSearchDubVideoQuery from "@/apis/community/queries/useSearchDubVideoQuery";
import useSearchDubProductQuery from "@/apis/community/queries/useSearchDubProductQuery";
import DubVideoList from "@/features/community/organism/DubVideoList";
import DubProductListItem from "@/components/molecules/DubProductListItem";
import { DubVideoSearch } from "@/types/DubVideoSearch";

interface IDubVideoResult {
  content: DubVideoSearch[];
}
export default function CommunityPage() {
  // 전역에서 들고오는 state
  const tabIndex = useSelector((state: RootState) => {
    return state.communityTab.dubType;
  });
  const languageIndex = useSelector((state: RootState) => {
    return state.languageTab.langType;
  });

  /** 현재 페이지에서 관리하는 state **/
  const [searchValue, setSearchValue] = useState("");
  const [keyword, setKeyword] = useState("");

  // 선택한 카테고리 태그
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);

  // 태그 선택
  const handleClickCategory = (id: number) => {
    console.log("fffff", searchDubVideoList);
    if (selectedCategory.includes(id)) {
      setSelectedCategory(selectedCategory.filter((tagId) => tagId !== id));
    } else {
      setSelectedCategory([...selectedCategory, id]);
    }
  };

  // query 결과 useState로
  const [searchDubVideoList, setSearchDubVideoList] =
    useState<IDubVideoResult>();

  // API 호출 response로 들어오는 state

  // 2. 콘텐츠 검색 결과 가져오기 (일단 처음에 랜딩할 때 보여주는 것도 일종의 검색을 한 것)
  const { data: videoData, isLoading: searchDubVideoLoading } =
    useSearchDubVideoQuery(selectedCategory, languageIndex, 10, keyword);

  useEffect(() => {
    if (videoData) {
      setSearchDubVideoList(videoData);
    }
  }, [videoData]);

  // 3. 작품 검색 결과 가져오기 (일단 처음에 랜딩할 때 보여주는 것도 일종의 검색을 한 것)
  const { data: searchDubProductList, isLoading: searchDubProductLoading } =
    useSearchDubProductQuery(selectedCategory, languageIndex, 10, keyword);

  // 4. 카테고리 리스트 가져오기
  const { data, isLoading } = useCategoryListQuery();

  // if (isLoading) {
  //   return <></>;
  // }

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
  function handleSearchInputClear() {
    console.log("검색어 지우기 눌렸다");
    setSearchValue("");
  }

  // if (searchDubVideoLoading) {
  //   return <>로딩 중</>;
  // }

  // if (searchDubProductLoading) {
  //   return <>작품 로딩 중</>;
  // }
  useEffect(() => {
    setSearchValue("");
    setKeyword("");
    setSelectedCategory([]);
  }, [tabIndex]);

  return (
    <div className="static h-full">
      <Header />
      <div className="flex sticky top-0">
        <DubTypeTap dubType={tabIndex} langType={languageIndex} />
      </div>
      {tabIndex === DubType.DUB_VIDEO ? (
        <div>
          <p className="flex justify-start text-19 font-bold mt-24 mb-16">
            김언도님이 좋아하실 영상
          </p>
          <DubVideoList />

          <p className="flex justify-start text-19 font-bold mt-24 mb-16">
            상황별로 더빙해봐요
          </p>
          <DubSituation />
        </div>
      ) : (
        <div>
          <p className="flex justify-start text-19 font-bold mt-24 mb-16">
            오늘의 더빙왕은?
          </p>
          <Vote />
        </div>
      )}

      <div className="mt-24"></div>
      {tabIndex === DubType.DUB_VIDEO ? (
        <SearchInputBox
          type="text"
          name="searchInputBox"
          value={searchValue}
          placeholder="더빙할 콘텐츠를 검색해보세요."
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchInputKeyDown}
          onClick={handleSearchInputClear}
        />
      ) : (
        <SearchInputBox
          type="text"
          name="searchInputBox"
          value={searchValue}
          placeholder="더빙 작품을 검색해보세요."
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchInputKeyDown}
          onClick={handleSearchInputClear}
        />
      )}

      <div className="flex mt-16">
        <Swiper>
          <SwiperSlide>
            <div className="flex flex-wrap gap-4 justify-center">
              {data &&
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
                })}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-wrap gap-4 justify-center">
              {data &&
                data[1].map((category: { id: any; name: string }) => {
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
                })}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-wrap gap-4 justify-center">
              {data &&
                data[2].map((category: { id: any; name: string }) => {
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
                })}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-wrap gap-4 justify-center">
              {data &&
                data[3].map((category: { id: any; name: string }) => {
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
                })}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="space-y-16 mt-16">
        {tabIndex === DubType.DUB_VIDEO &&
          searchDubVideoList?.content.map(
            (dubVideo: {
              id: number;
              title: string;
              thumbnail: string;
              runtime: number;
            }) => (
              <DubVideoListItem
                key={dubVideo.id}
                id={dubVideo.id}
                title={dubVideo.title}
                thumbnail={dubVideo.thumbnail}
                runtime={dubVideo.runtime}
              />
            )
          )}
        {tabIndex === DubType.DUB_PRODUCT &&
          searchDubProductList?.content.map(
            (dubProduct: {
              id: number;
              recordId: number;
              title: string;
              thumbnail: string;
              runtime: number;
              imageUrl: string;
              nickname: string;
              playCount: number;
              createdDate: string;
            }) => (
              <DubProductListItem
                key={dubProduct.id}
                id={dubProduct.id}
                recordId={dubProduct.recordId}
                title={dubProduct.title}
                thumbnail={dubProduct.thumbnail}
                runtime={dubProduct.runtime}
                imageUrl={dubProduct.imageUrl}
                nickname={dubProduct.nickname}
                playCount={dubProduct.playCount}
                createdDate={dubProduct.createdDate}
              />
            )
          )}
      </div>
    </div>
  );
}
