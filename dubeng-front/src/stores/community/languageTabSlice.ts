import { createSlice } from "@reduxjs/toolkit";
import { LangType } from "@/enum/statusType";

interface LanguageTabState {
  langType: LangType.ENGLISH | LangType.KOREAN;
}

const initialState: LanguageTabState = {
  langType: LangType.ENGLISH,
};

const languageTabSlice = createSlice({
  name: "languageTabIndex",
  initialState,
  reducers: {
    setTabEnglish: (state: { langType: LangType }) => {
      state.langType = LangType.ENGLISH;
    },
    setTabKorean(state: { langType: LangType }) {
      state.langType = LangType.KOREAN;
    },
  },
});

export const { setTabEnglish, setTabKorean } = languageTabSlice.actions;

export default languageTabSlice.reducer;
