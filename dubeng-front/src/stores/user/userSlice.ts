import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  userId: string;
  roleType: string;
}

const initialState: UserState = {
  userId: "",
  roleType: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      state.userId = action.payload.userId;
      state.roleType = action.payload.roleType;
    },
  },
})

export const { saveUserInfo } = userSlice.actions

export default userSlice.reducer