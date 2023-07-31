import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ScriptsListItem {
  duration: number;
  startTime: number;
  content: string;
  translateContent: string;
  isDub: number;
}

interface ScriptsList {
  scriptsList: ScriptsListItem[];
}

const initialState: ScriptsList = {
  scriptsList: [],
};

export const scriptsPostSlice = createSlice({
  name: "scriptsPost",
  initialState,
  reducers: {
    addScriptsInfo: (state, action) => {
      state.scriptsList.push(action.payload);
    },
    clearScriptsInfo: (state) => {
      state.scriptsList = [];
    },
  },
});

export const { addScriptsInfo, clearScriptsInfo } = scriptsPostSlice.actions;

export default scriptsPostSlice.reducer;
