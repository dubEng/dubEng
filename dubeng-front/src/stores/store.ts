import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from '../stores/user/userSlice'

const reducers = combineReducers({
    user: userReducer,
  });

export const store = configureStore({
  reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch