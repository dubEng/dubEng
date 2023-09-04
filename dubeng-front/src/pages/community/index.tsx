import DubTypeTap from "@/features/community/atoms/DubTypeTap";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { DubType, EmptyType, LangType } from "@/enum/statusType";
import DubSituation from "@/features/community/molecules/DubSituation";
import SearchInputBox from "@/features/community/atoms/SearchInputBox";
import { useEffect, useRef, useState } from "react";
import DubVideoListItem from "@/components/molecules/DubVideoListItem";
import useCategoryListQuery from "@/apis/community/queries/useCategoryListQuery";
import CategoryButton from "@/features/community/atoms/CategoryButton";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Vote from "@/features/community/organism/Vote";
import useSearchDubVideoQuery from "@/apis/community/queries/useSearchDubVideoQuery";
import useSearchDubProductQuery from "@/apis/community/queries/useSearchDubProductQuery";
import DubVideoList from "@/features/community/organism/DubVideoList";
import DubProductListItem from "@/components/molecules/DubProductListItem";
import { DubVideoSearch } from "@/types/DubVideoSearch";
import EmptyComponent from "@/components/atoms/EmptyComponent";
import Head from "next/head";
import Pagination from "@/features/community/organism/Pagination";

interface IDubVideoResult {
  content: DubVideoSearch[];
}
export default function CommunityPage() {
  // 전역에서 들고오는 state
  const userId = useSelector((state: RootState) => state.user.userId);
  const tabIndex = useSelector((state: RootState) => {
    return state.communityTab.dubType;
  });
  const languageIndex = useSelector((state: RootState) => {
    return state.languageTab.langType;
  });
  const userNickname = useSelector((state: RootState) => {
    if (state.user.nickname === "") {
      return "익명의 게스트";
    } else {
      return state.user.nickname;
    }
  });

  /** 현재 페이지에서 관리하는 state **/
  const [searchValue, setSearchValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);

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

  // query 결과 useState로
  const [searchDubVideoList, setSearchDubVideoList] =
    useState<IDubVideoResult>();

  // API 호출 response로 들어오는 state

  // 2. 콘텐츠 검색 결과 가져오기 (일단 처음에 랜딩할 때 보여주는 것도 일종의 검색을 한 것)
  const { data: videoData, isLoading: searchDubVideoLoading } =
    useSearchDubVideoQuery(selectedCategory, languageIndex, 10, page, keyword);

  useEffect(() => {
    if (videoData) {
      setSearchDubVideoList(videoData);
    }
  }, [videoData]);

  // 3. 작품 검색 결과 가져오기 (일단 처음에 랜딩할 때 보여주는 것도 일종의 검색을 한 것)
  const { data: searchDubProductList, isLoading: searchDubProductLoading } =
    useSearchDubProductQuery(
      selectedCategory,
      languageIndex,
      10,
      page,
      keyword
    );

  // 4. 카테고리 리스트 가져오기
  const { data, isLoading } = useCategoryListQuery();

  // 페이지 넘버 초기화하는 경우 -> 탭, 검색키워드, 선택 카테고리
  useEffect(() => {
    setPage(0);
  }, [tabIndex]);

  useEffect(() => {
    setPage(0);
  }, [keyword]);

  useEffect(() => {
    setPage(0);
  }, [selectedCategory]);

  /* 함수 */
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handleSearchInputKeyDown = (
    event: React.KeyboardEvent<HTMLElement>
  ) => {

    const enterKey = 13;
    
    if (event.keyCode === enterKey) {
      setKeyword(searchValue);
    }
  };

  function handleSearchInputClear() {
    setSearchValue("");
  }

  useEffect(() => {
    setSearchValue("");
    setKeyword("");
    setSelectedCategory([]);
  }, [tabIndex]);

  // 페이지네이션 페이지 넘버 클릭할 때 이동시킬 위치인 ref
  const searchInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPage(0);
  }, [tabIndex, languageIndex]);

  return (
    <div className="static h-full px-16 bg-white mt-57 mb-61">
      <Head>
        <title>더빙으로 배우는 영어 쉐도잉 서비스 - 더빙 목록</title>
        <meta
          name="description"
          content="더빙으로 배우는 영어 쉐도잉 서비스, 추천 더빙 영상을 통해 나에게 알맞은 영상을 더빙해보세요"
        />
      </Head>
      <div className="flex sticky top-0">
        <DubTypeTap dubType={tabIndex} langType={languageIndex} />
      </div>
      {tabIndex === DubType.DUB_VIDEO ? (
        <div>
          {languageIndex === LangType.ENGLISH ? (
            <div>
              <p className="flex justify-start text-19 font-bold mt-24 mb-16">
                {userNickname}님이 좋아하실 영상
              </p>
              {userId ? (
                <DubVideoList />
              ) : (
                <EmptyComponent status={EmptyType.NO_RECOMMEND_ANONY} />
              )}
            </div>
          ) : null}

          {languageIndex === LangType.ENGLISH ? (
            <p className="flex justify-start text-19 font-bold mt-24 mb-16">
              상황별로 더빙해봐요
            </p>
          ) : (
            <p className="flex justify-start text-19 font-bold mt-24 mb-16">
              인기 더빙 모음집
            </p>
          )}

          <DubSituation />
        </div>
      ) : languageIndex === LangType.ENGLISH ? (
        <div>
          <p className="flex justify-start text-19 font-bold mt-24 mb-16">
            오늘의 더빙왕은?
          </p>
          {userId ? (
            <Vote userId={userId} languageIndex={languageIndex} />
          ) : (
            <EmptyComponent status={EmptyType.NO_VOTE_ANONY} />
          )}
        </div>
      ) : (
        <div>
          <p className="flex justify-start text-19 font-bold mt-24 mb-16">
            오늘의 더빙왕은?
          </p>
          <EmptyComponent status={EmptyType.KOREAN_VOTE} />
        </div>
      )}

      <div className="mt-24"></div>
      {tabIndex === DubType.DUB_VIDEO ? (
        <div ref={searchInputRef}>
          <SearchInputBox
            type="text"
            name="searchInputBox"
            value={searchValue}
            placeholder="더빙할 콘텐츠를 검색해보세요."
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchInputKeyDown}
            onClick={handleSearchInputClear}
          />
        </div>
      ) : (
        <div ref={searchInputRef}>
          <SearchInputBox
            type="text"
            name="searchInputBox"
            value={searchValue}
            placeholder="더빙 작품을 검색해보세요."
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchInputKeyDown}
            onClick={handleSearchInputClear}
          />
        </div>
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
      </div>
      <div className="space-y-16 mt-16">
        {tabIndex === DubType.DUB_PRODUCT &&
          searchDubProductList?.content.map(
            (dubProduct: {
              id: number;
              recordId: number;
              title: string;
              thumbnail: string;
              runtime: number;
              profileImage: string;
              nickname: string;
              playCount: number;
              updatedDate: string;
            }) => (
              <DubProductListItem
                key={dubProduct.recordId}
                id={dubProduct.id}
                recordId={dubProduct.recordId}
                title={dubProduct.title}
                thumbnail={dubProduct.thumbnail}
                runtime={dubProduct.runtime}
                profileImage={dubProduct.profileImage}
                nickname={dubProduct.nickname}
                playCount={dubProduct.playCount}
                updatedDate={dubProduct.updatedDate}
              />
            )
          )}
      </div>
      {tabIndex === DubType.DUB_VIDEO &&
      videoData &&
      videoData.content.length > 0 ? (
        <Pagination
          page={page}
          totalPages={videoData.totalPages}
          // currentPageArray={currentPageArray}
          setPage={setPage}
          inputRef={searchInputRef}
        />
      ) : (
        <></>
      )}
      {tabIndex === DubType.DUB_PRODUCT &&
      searchDubProductList &&
      searchDubProductList.content.length > 0 ? (
        <Pagination
          page={page}
          totalPages={searchDubProductList.totalPages}
          // currentPageArray={currentPageArray}
          setPage={setPage}
          inputRef={searchInputRef}
        />
      ) : (
        <></>
      )}
      <div className="h-80"></div>
    </div>
  );
}
