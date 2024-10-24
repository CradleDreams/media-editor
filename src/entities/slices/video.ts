import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IVideo {
  id: string;
  src: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  duration?: number;
}
interface IVideoSlice {
  videos: IVideo[];
}
const initialState: IVideoSlice = {
  videos: [],
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    createVideo: (state, action: PayloadAction<IVideo>) => {
      state.videos.push(action.payload);
    },
  },
});
export const { createVideo } = videoSlice.actions;
export const videoReducer =  videoSlice.reducer;
