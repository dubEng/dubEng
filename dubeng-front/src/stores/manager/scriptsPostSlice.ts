import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ScriptPostState {
  duration: number;
  startTime: number;
  content: string;
  translateContent: string;
  isDub: number;
}

const initialState: ScriptPostState[] = [];

export const scriptsPostSlice = createSlice({
  name: "scriptsPost",
  initialState,
  reducers: {
    addScriptsInfo: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addScriptsInfo } = scriptsPostSlice.actions;

export default scriptsPostSlice.reducer;
