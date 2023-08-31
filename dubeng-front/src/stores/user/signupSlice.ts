import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface signupInfoState {
  accessToken: string;
  imageUrl: string;
  nickname : string;
  introduce : string;
  interest: number[];
  kitchenName: string;
  gender: boolean;
}

const initialState: signupInfoState = {
  accessToken: "",
  imageUrl: "",
  nickname: "",
  introduce: "",
  interest: [],
  kitchenName: "",
  gender: true,
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    saveSignupInfo: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.imageUrl = action.payload.imageUrl;
      state.nickname = action.payload.nickname;
      state.introduce = action.payload.introduce;
      state.gender = action.payload.gender;
    },
  },
});

export const { saveSignupInfo } = signupSlice.actions;

export default signupSlice.reducer;
