import { createSlice } from "@reduxjs/toolkit";

interface missionModalState {
  isOpen: boolean;
  title: string;
}

const initialState: missionModalState = {
  isOpen: false,
  title: "",
};

const missionModalSlice = createSlice({
  name: "missionModal",
  initialState,
  reducers: {
    setOpen(state, action) {
        state.isOpen = true;
        state.title = action.payload;
      },
      setClose(state) {
        state.isOpen = false;
        state.title = "";
      },
  },
});

export const { setOpen, setClose } = missionModalSlice.actions;

export default missionModalSlice.reducer;
