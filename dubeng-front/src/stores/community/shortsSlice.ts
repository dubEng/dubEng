import { Direct } from "@/enum/statusType";
import { createSlice } from "@reduxjs/toolkit";

interface ShortsState {
  recordIdList: number[];
  dir: Direct;
}

const initialState: ShortsState = {
  recordIdList: [],
  dir: Direct.DOWN,
};

const shortsSlice = createSlice({
  name: "shortsRecordIdList",
  initialState,
  reducers: {
    setRecordIdListClear: (state) => {
      state.recordIdList = [];
      state.dir = Direct.DOWN;
    },
    setRecordIdList: (state, action) => {
      state.recordIdList = [...state.recordIdList, action.payload];
    },
    setDir(state, action) {
      state.dir = action.payload;
    },
  },
});

export const { setRecordIdList, setDir, setRecordIdListClear } =
  shortsSlice.actions;

export default shortsSlice.reducer;
