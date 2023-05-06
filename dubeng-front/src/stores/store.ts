import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../stores/user/userSlice";
import scriptsPostSlice from "./manager/scriptsPostSlice";
import signupSlice from "./user/signupSlice";

const reducers = combineReducers({
  user: userReducer,
  scriptsPostInfo: scriptsPostSlice,
  signupInfo : signupSlice
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
