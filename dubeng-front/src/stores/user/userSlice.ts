import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userId: string;
  accessToken: string;
  refreshToken: string;
  nickname: string;
  imageUrl: string;
}

const initialState: UserState = {
  userId: "",
  accessToken: "",
  refreshToken: "",
  nickname: "익명의 게스트",
  imageUrl: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      state.userId = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.nickname = action.payload.nickname;
      state.imageUrl = action.payload.imageUrl;
    },
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { saveUserInfo, saveAccessToken } = userSlice.actions;

export default userSlice.reducer;
