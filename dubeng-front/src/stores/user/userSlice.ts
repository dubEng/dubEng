import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userId: string;
  accessToken: string;
  nickname: string;
  imageUrl: string;
}

const initialState: UserState = {
  userId: "",
  accessToken: "",
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
      state.nickname = action.payload.nickname;
      state.imageUrl = action.payload.imageUrl;
    },
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    userLogout: (state, action) => {
      state = initialState;
    },
  },
});

export const { saveUserInfo, saveAccessToken, userLogout } = userSlice.actions;

export default userSlice.reducer;
