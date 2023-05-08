import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface DubbingState {
  recordingBlobMap: Map<number, Blob>;
}

const initialState: DubbingState = {
  recordingBlobMap: new Map<number, Blob>(),
};

export const dubbingSlice = createSlice({
  name: "dubbing",
  initialState,
  reducers: {
    addRecordingBlob: (
      state,
      action: PayloadAction<{ index: number; blob: Blob }>
    ) => {
      // 새로운 blob 객체를 맵에 추가하여 새로운 맵을 반환합니다.
      state.recordingBlobMap = state.recordingBlobMap.set(
        action.payload.index,
        action.payload.blob
      );
    },
  },
});

export const { addRecordingBlob } = dubbingSlice.actions;

export default dubbingSlice.reducer;
