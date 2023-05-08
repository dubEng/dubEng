import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../stores/user/userSlice";
import scriptsPostSlice from "./manager/scriptsPostSlice";
import communityTabSlice from "./community/communityTabSlice";
import languageTabSlice from "./community/languageTabSlice";
import signupSlice from "./user/signupSlice";

const reducers = combineReducers({
  user: userReducer,
  scriptsPostInfo: scriptsPostSlice,
  communityTab: communityTabSlice,
  languageTab: languageTabSlice,
  signupInfo : signupSlice,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
