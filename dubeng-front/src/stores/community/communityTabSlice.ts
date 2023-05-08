import { createSlice } from "@reduxjs/toolkit";
import { DubType } from "@/enum/statusType";

interface communityTabState {
  dubType: DubType.DUB_VIDEO | DubType.DUB_PRODUCT;
}

const initialState: communityTabState = {
  dubType: DubType.DUB_VIDEO,
};

const communityTabSlice = createSlice({
  name: "communityTabIndex",
  initialState,
  reducers: {
    setTabDubVideo: (state: { dubType: DubType }) => {
      state.dubType = DubType.DUB_VIDEO;
    },
    setTabDubProduct(state: { dubType: DubType }) {
      state.dubType = DubType.DUB_PRODUCT;
    },
  },
});

export const { setTabDubVideo, setTabDubProduct } = communityTabSlice.actions;

export default communityTabSlice.reducer;
