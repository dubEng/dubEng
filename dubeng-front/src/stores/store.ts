// import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import userReducer from "../stores/user/userSlice";
import scriptsPostSlice from "./manager/scriptsPostSlice";
import communityTabSlice from "./community/communityTabSlice";
import languageTabSlice from "./community/languageTabSlice";
import signupSlice from "./user/signupSlice";
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import missionModalSlice from "./mission/missionModalSlice";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === 'undefined'
    ? createNoopStorage()
    : createWebStorage('local');

const reducers = combineReducers({
  user: userReducer,
  scriptsPostInfo: scriptsPostSlice,
  communityTab: communityTabSlice,
  languageTab: languageTabSlice,
  signupInfo: signupSlice,
  missionModal: missionModalSlice,
});

const persistConfig = {
  timeout: 100,
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
